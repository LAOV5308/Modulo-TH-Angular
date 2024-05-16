CREATE DATABASE FamoProductos

CREATE TABLE tblProductos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Clave VARCHAR(50),
    Nombre VARCHAR(255),
    Precio DECIMAL,
    Piezas INT
);


/*Procedimiento almacenado para Guardar*/
CREATE PROCEDURE stp_producto_add
    @Clave VARCHAR(50),
    @Nombre VARCHAR(255),
    @Precio DECIMAL,
    @Piezas INT
AS
BEGIN
    INSERT INTO tblProductos(Clave, Nombre, Precio, Piezas)
    VALUES (@Clave, @Nombre, @Precio, @Piezas);
END;

/*Procedimiento almacenado para Eliminar*/
CREATE PROCEDURE stp_producto_delete
    @Id INT
AS
BEGIN
    DELETE FROM tblProductos
	WHERE Id = @Id
END;

/*Procedimiento almacenado para Obtener todos los datos*/
CREATE PROCEDURE stp_producto_getall
AS
BEGIN
    SELECT * FROM tblProductos
END;



Select * from tblProductos

EXEC stp_producto_add '001', 'Queso Ranchero', 30.5, 90;
EXEC stp_producto_add '002', 'Queso Bolita', 15, 10;
EXEC stp_producto_add '003', 'Queso Asadero', 25, 80;
EXEC stp_producto_add '004', 'Queso Fresco', 34, 50;
EXEC stp_producto_add '005', 'Crema', 23, 23;



EXEC stp_producto_delete 6;

EXEC stp_producto_getall;