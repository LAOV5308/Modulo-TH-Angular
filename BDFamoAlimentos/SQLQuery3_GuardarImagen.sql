USE master
GO

CREATE DATABASE Samples
GO

USE Samples
GO

CREATE TABLE Notes (
     Id int IDENTITY (1, 1) NOT NULL
    ,Title varchar(50) NOT NULL
    ,ImageData varbinary(MAX) NOT NULL
)