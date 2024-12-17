USE TrafficDB;
GO


INSERT INTO Intersections (Name) 
VALUES 
    ('SW 34th St & Main St'),
    ('NW 12th Ave & 1st St'),
    ('SE 15th St & 8th Ave'),
    ('NE 45th St & 23rd Ave'),
    ('SW 7th St & Central Blvd'),
    ('NW 22nd St & Highway 4'),
    ('SE 5th St & Park Lane'),
    ('NE 10th Ave & Market St');


	SELECT * FROM Intersections;


	CREATE TABLE Level1Categories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,            
    IntersectionId INT NOT NULL,          
    Factor NVARCHAR(255),                  
    BaseConditions NVARCHAR(255),          
    SiteConditions NVARCHAR(255),          
    SiteCMF NVARCHAR(255),                 
    FOREIGN KEY (IntersectionId) REFERENCES Intersections(Id) 
);

CREATE TABLE Level2Categories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,           
    ParentId INT NOT NULL,                 
    IntersectionId INT NOT NULL,           
    Factor NVARCHAR(255),                  
    BaseConditions NVARCHAR(255),          
    SiteConditions NVARCHAR(255),          
    SiteCMF NVARCHAR(255),                 
    FOREIGN KEY (ParentId) REFERENCES Level1Categories(Id),   
    FOREIGN KEY (IntersectionId) REFERENCES Intersections(Id) 
);

ALTER TABLE Level1Categories
ADD CategoryTypeName NVARCHAR(255) NOT NULL;


INSERT INTO Level1Categories (Name, IntersectionId, CategoryTypeName, Factor, BaseConditions, SiteConditions, SiteCMF)
VALUES 
    ('CMF 1', 1, 'Crash Modification Factors', 'CMF 1', '0', '4', '0.665'),
    ('CMF 2', 1, 'Crash Modification Factors', 'CMF 1', 'not present', 'present', '0.665'),
    ('CMF 3', 1, 'Crash Modification Factors', 'CMF 1', 'permissive', '-', '0.665'),
	('VEHICLE PEDESTIAN', 1, 'SPF Parameters', 'VEHICLE PEDESTIAN', '', '', '');



	INSERT INTO Level1Categories (Name, IntersectionId, CategoryTypeName, Factor, BaseConditions, SiteConditions, SiteCMF)
VALUES 
    ('CMF 4', 2, 'Crash Modification Factors', 'CMF 4', '0', '5', '0.999'),
    ('CMF 5', 2, 'Crash Modification Factors', 'CMF 5', 'not present', 'present', '0.665'),
    ('CMF 6', 2, 'Crash Modification Factors', 'CMF 6', 'permissive', '-', '0.665'),
	('VEHICLE PEDESTIAN', 'SPF Parameters', 'VEHICLE check', '0', '6', '');


	INSERT INTO Level1Categories (Name, IntersectionId, CategoryTypeName, Factor, BaseConditions, SiteConditions, SiteCMF)
VALUES 
    ('SPF 1', 1, 'SPF Parameters', 'SPF 1', '0', '4', '0.665'),
    ('SPF 2', 1, 'SPF Parameters', 'SPF 2', 'not present', 'present', '0.665'),
    ('SPF 3', 1, 'SPF Parameters', 'SPF 3', 'permissive', '-', '0.665');


	INSERT INTO Level1Categories (Name, IntersectionId, CategoryTypeName, Factor, BaseConditions, SiteConditions, SiteCMF)
VALUES 
    ('PC 1', 1, 'Predicted Crashes', 'PC 1', '0', '4', '0.665'),
    ('PC 2', 1, 'Predicted Crashes', 'PC 2', 'NOT PERMISSIVE', 'permissive', '0.560'),
    ('PC 3', 1, 'Predicted Crashes', 'PC 3', 'permissive', '-', '0.5');


	select * from Level1Categories;

	SELECT @@SERVERNAME AS ServerName;

	
	INSERT INTO Level2Categories (Name, ParentId,IntersectionId, Factor, BaseConditions, SiteConditions, SiteCMF)
VALUES 
    ('Left turn signal 1', 2,1, 'Left turn signal 1', '50', 'protected permissive', '0.665'),
    ('Left turn signal 2', 2,1,'Left turn signal 2',  'NOT PERMISSIVE', 'permissive', '0.560'),
    ('Left turn signal 3', 2,1, 'Left turn signal 3','0', '8', '0.5');


	INSERT INTO Level2Categories (Name, ParentId,IntersectionId, Factor, BaseConditions, SiteConditions, SiteCMF)
VALUES 
    ('right turn signal 1', 4,1, 'right turn signal 1', '456', 'protected ', '1.665'),
    ('right turn signal 2', 4,1,'right turn signal 2',  '458', 'public', '1.560'),
    ('right turn signal 3', 4,1, 'right turn signal 3','500', 'private', '1.5');


	select * from Level2Categories;