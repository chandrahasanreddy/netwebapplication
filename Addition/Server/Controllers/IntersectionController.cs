using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IntersectionController : ControllerBase
    {
        private readonly string connectionString = "Server=Sunny\\SQLEXPRESS;Database=TrafficDB;Trusted_Connection=True;TrustServerCertificate=True";

        [HttpPost]
        public IActionResult GetLevel1Categories([FromBody] IntersectionRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.intersectionName))
            {
                return BadRequest("Invalid input");
            }

            int intersectionId = -1;
            var categoryData = new Dictionary<string, List<CategoryItem>>();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    // Fetch Intersection ID
                    string queryIntersection = "SELECT Id FROM Intersections WHERE Name = @IntersectionName";
                    using (SqlCommand cmd = new SqlCommand(queryIntersection, connection))
                    {
                        cmd.Parameters.AddWithValue("@IntersectionName", request.intersectionName);
                        var result = cmd.ExecuteScalar();
                        if (result != null)
                        {
                            intersectionId = (int)result;
                        }
                        else
                        {
                            return NotFound("Intersection not found");
                        }
                    }

                    // Fetch Level 1 categories and build hierarchical data
                    string queryCategories = @"
                        SELECT Id, Factor, BaseConditions, SiteConditions, SiteCMF, CategoryTypeName
                        FROM Level1Categories
                        WHERE IntersectionId = @IntersectionId";

                    var level1Categories = new Dictionary<int, CategoryItem>();

                    using (SqlCommand cmd = new SqlCommand(queryCategories, connection))
                    {
                        cmd.Parameters.AddWithValue("@IntersectionId", intersectionId);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                int id = Convert.ToInt32(reader["Id"]);
                                var categoryItem = new CategoryItem
                                {
                                    
                                    Factor = reader["Factor"].ToString(),
                                    BaseConditions = reader["BaseConditions"].ToString(),
                                    SiteConditions = reader["SiteConditions"].ToString(),
                                    SiteCMF = reader["SiteCMF"].ToString(),
                                    Children = new List<CategoryItem>()
                                };

                                string categoryType = reader["CategoryTypeName"].ToString();
                                if (!categoryData.ContainsKey(categoryType))
                                {
                                    categoryData[categoryType] = new List<CategoryItem>();
                                }

                                // Add Level 1 category
                                categoryData[categoryType].Add(categoryItem);
                                level1Categories[id] = categoryItem;
                            }
                        }
                    }

                    // Fetch Level 2 categories and link them as children
                    string queryLevel2 = @"
                        SELECT Id, Name AS Factor, ParentId, BaseConditions, SiteConditions, SiteCMF
                        FROM Level2Categories
                        WHERE IntersectionId = @IntersectionId";

                    using (SqlCommand cmd = new SqlCommand(queryLevel2, connection))
                    {
                        cmd.Parameters.AddWithValue("@IntersectionId", intersectionId);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                int parentId = Convert.ToInt32(reader["ParentId"]);
                                var childCategory = new CategoryItem
                                {
                                    
                                    Factor = reader["Factor"].ToString(),
                                    BaseConditions = reader["BaseConditions"].ToString(),
                                    SiteConditions = reader["SiteConditions"].ToString(),
                                    SiteCMF = reader["SiteCMF"].ToString(),
                                    Children = new List<CategoryItem>()
                                };

                                // Link Level 2 to its Level 1 parent
                                if (level1Categories.ContainsKey(parentId))
                                {
                                    level1Categories[parentId].Children.Add(childCategory);
                                }
                            }
                        }
                    }

                    // Print JSON for debugging
                    string jsonCategoryData = JsonConvert.SerializeObject(categoryData, Formatting.Indented);
                    Console.WriteLine("Category Data: " + jsonCategoryData);
                }

                return Ok(new
                {
                    IntersectionId = intersectionId,
                    Categories = categoryData
                });
            }
            catch (SqlException ex)
            {
                return StatusCode(500, $"Database error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }
    }

    // DTO for request
    public class IntersectionRequest
    {
        public string intersectionName { get; set; }
    }

    // DTO for category items (hierarchical structure)
    public class CategoryItem
    {
       
        public string Factor { get; set; }
        public string BaseConditions { get; set; }
        public string SiteConditions { get; set; }
        public string SiteCMF { get; set; }
        public List<CategoryItem> Children { get; set; }
    }
}
