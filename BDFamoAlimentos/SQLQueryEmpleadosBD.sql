-- Crear la base de datos
CREATE DATABASE EmpleadosDB;
GO

-- Usar la base de datos
USE EmpleadosDB;
GO

-- Crear tabla Departamentos
CREATE TABLE Departamentos (
    DepartamentoId INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(50) NOT NULL,
    Ubicacion VARCHAR(100)
);

-- Crear tabla Puestos
CREATE TABLE Puestos (
    PuestoId INT PRIMARY KEY IDENTITY(1,1),
    Titulo VARCHAR(50) NOT NULL,
    Salario DECIMAL(10,2)
);

-- Crear tabla Empleados
CREATE TABLE Empleados (

	--Informacion Personal
    EmpleadoId INT PRIMARY KEY IDENTITY(1,1),
	Nombre VARCHAR(50),
	Apellidos VARCHAR(50),
    Sexo VARCHAR(10),
    EstadoCivil VARCHAR(30),
    FechaNacimiento DATE,
    EntidadNacimiento VARCHAR(30),
    CiudadNacimiento VARCHAR(30),
	CURP VARCHAR(18),
	RFC VARCHAR(15),
    NSS VARCHAR(15),
    UMF VARCHAR(3),

	--Informacion Laboral
	NoNomina INT,
	Nivel VARCHAR(50),
	IdDepartamento INT,
	IdPuesto INT,
	Responsable VARCHAR(50),
	TipoIngreso VARCHAR(50),
	Ingreso DATE,
	HorarioSemanal VARCHAR(50),

	--Domicilio
    CorreoElectronico VARCHAR(50),
    NumeroTelefono1 VARCHAR(15),
    NumeroTelefono2 VARCHAR(15),
	DomicilioIne VARCHAR(50),
    Poblacion VARCHAR(50),
    EntidadDireccion VARCHAR(50),
	CP VARCHAR(50),

	--Contacto de Emergencia
	NombreBeneficiario VARCHAR(50),
	Parentesco VARCHAR(30),
	FechaNacimientoBeneficiario DATE,
    NumeroTelefonoEmergencia VARCHAR(15)
);


CREATE TABLE tblPersonal(
--Informacion Personal
    IdPersona INT PRIMARY KEY IDENTITY(1,1),
	Nombre VARCHAR(50),
	Apellidos VARCHAR(50),
    Sexo VARCHAR(10),
    EstadoCivil VARCHAR(30),
    FechaNacimiento DATE,
    EntidadNacimiento VARCHAR(30),
    CiudadNacimiento VARCHAR(30),
	CURP VARCHAR(18),
	RFC VARCHAR(15),
    NSS VARCHAR(15),
    UMF VARCHAR(3),
	EstadoPersona BIT
);


CREATE TABLE Empleados (
--Informacion Laboral
	NoNomina INT Primary Key,
	IdPersona INT,
	Nivel VARCHAR(50),
	IdDepartamento INT,
	IdPuesto INT,
	Responsable VARCHAR(50),
	TipoIngreso VARCHAR(50),
	Ingreso DATE,
	HorarioSemanal VARCHAR(50),
	EstadoEmpleado BIT,
);


Create Table tblDomicilio(
	IdPersona int,
  DomicilioIne VARCHAR(50),
    Poblacion VARCHAR(50),
    EntidadDireccion VARCHAR(50),
	  CP VARCHAR(50),
	  CorreoElectronico VARCHAR(50),
    NumeroTelefono1 VARCHAR(15),
    NumeroTelefono2 VARCHAR(15),
	
);

Create Table tblContactoEmergencia(
	IdPersona int,
	NombreBeneficiario VARCHAR(50),
	Parentesco VARCHAR(30),
	FechaNacimientoBeneficiario DATE,
    NumeroTelefonoEmergencia VARCHAR(15)
);





-- Insertar datos de ejemplo en la tabla Departamentos
INSERT INTO Departamentos (Nombre, Ubicacion)
VALUES ('Ventas', 'Nueva York'), ('Marketing', 'Los Ángeles'), ('Finanzas', 'Chicago');

-- Insertar datos de ejemplo en la tabla Puestos
INSERT INTO Puestos (Titulo, Salario)
VALUES ('Gerente de Ventas', 80000.00), ('Representante de Ventas', 50000.00), ('Analista de Marketing', 65000.00);

-- Insertar datos de ejemplo en la tabla Empleados
INSERT INTO Empleados (Nombre, Apellido, Direccion, Ciudad, Estado, CodigoPostal, Telefono, Email, FechaNacimiento, FechaContratacion, DepartamentoId, PuestoId)
VALUES ('Juan', 'Pérez', '123 Calle Principal', 'Nueva York', 'NY', '10001', '555-1234', 'juan.perez@ejemplo.com', '1985-05-15', '2010-03-01', 1, 1),
       ('María', 'García', '456 Avenida Central', 'Los Ángeles', 'CA', '90001', '555-5678', 'maria.garcia@ejemplo.com', '1990-09-20', '2015-07-01', 2, 3),
       ('Carlos', 'Ramírez', '789 Calle Secundaria', 'Chicago', 'IL', '60601', '555-9012', 'carlos.ramirez@ejemplo.com', '1988-02-10', '2012-11-15', 3, 2);


/*Consulta de Nombre de empleado su puesto y el Departamento con JOIN*/
SELECT e.Nombre, e.Apellido, p.Titulo AS Puesto, d.Nombre AS Departamento
FROM Empleados e
JOIN Puestos p ON e.PuestoId = p.PuestoId
JOIN Departamentos d ON e.DepartamentoId = d.DepartamentoId;

Select * from Puestos
/*Otra consulta parecida a inner join*/
SELECT Nombre, Apellido, (SELECT Titulo FROM Puestos WHERE PuestoId = Empleados.PuestoId) AS Puesto
FROM Empleados;



/*START*/
drop table tblPuestos


-- Crear tabla Direccion
CREATE TABLE tblDireccion (
    IdDireccion INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	IdPersona INT,
	DomicilioIne VARCHAR(50),
	Poblacion VARCHAR(50),
	EntidadDireccion VARCHAR(50),
	CP VARCHAR(50),
	CorreoElectronico VARCHAR(50),
	NumeroTelefono1 VARCHAR(15),
	NumeroTelefono2 VARCHAR(15),
	NumeroTelefonoEmergencia VARCHAR(15)
);



-- Crear tabla Departamentos
CREATE TABLE tblDepartamentos (
    IdDepartamento INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	NumeroNomina INT,
	NombreDepartamento VARCHAR(50),
	EstadoDepartamento BIT
);

-- Crear tabla Puestos
CREATE TABLE tblPuestos (
	IdPuesto INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	IdDepartamento INT,
	NombrePuesto VARCHAR(100),
	EstadoPuesto BIT
);

select D.IdDepartamento, D.NombreDepartamento, P.NombrePuesto , P.IdPuesto FROM tblPuestos P INNER JOIN tblDepartamentos D
ON P.IdDepartamento = D.IdDepartamento

Select * from tblDepartamentos
Select * from tblEmpleado E inner join tblPersonal P
ON E.IdPersona = P.IdPersona


create view V_empleadosgral as
Select E.NumeroNomina, P.NombrePersonal AS Nombre, E.Nivel,D.NombreDepartamento as Departamento,
PT.NombrePuesto as Puesto, PRS.NombrePersonal AS Responsable, E.TipoIngreso, E.Ingreso, E.Antiguedad, E.HorarioSemanal,
DI.CorreoElectronico, DI.NumeroTelefono1, P.NSS, P.UMF, P.EstadoCivil, P.Sexo, P.FechaNacimiento,
P.EntidadNacimiento, P.CiudadNacimiento, P.RFC, P.CURP, DI.DomicilioIne, DI.Poblacion, DI.EntidadDireccion,
DI.CP, DI.NumeroTelefono2, P.NombreBeneficiario, P.Parentesco, P.FechaNacimientoBeneficiario,
Di.NumeroTelefonoEmergencia
from tblEmpleado E Inner Join tblPersonal P
ON E.IdPersona = P.IdPersona
INNER JOIN tblDireccion DI
ON DI.IdPersona = P.IdPersona
INNER JOIN tblPuestos PT
ON E.IdPuesto = PT.IdPuesto
INNER JOIN tblDepartamentos D
ON PT.IdDepartamento = D.IdDepartamento
INNER JOIN tblEmpleado EP
ON EP.NumeroNomina = D.NumeroNomina
INNER JOIN tblPersonal PRS
ON EP.IdPersona = PRS.IdPersona

--Drop View V_empleadosgral

Select * from tblEmpleado

Select * from V_empleadosgral EG

SELECT * FROM tblEmpleado where EstadoEmpleado = 1




-- Crear tabla PuestoResponsable
/*CREATE TABLE tblPuestoResponsable (
	IdPuestoResponsable INT PRIMARY KEY IDENTITY(1,1),
	IdDepartamento INT,
	IdPuesto INT,
	/*Responsable*/
	NumeroNomina INT,
);
*/


-- Crear tabla Personal
CREATE TABLE tblPersonal (
    IdPersona INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    NombrePersonal VARCHAR(50),
    Sexo VARCHAR(10),
    FechaNacimiento DATE,
    EntidadNacimiento VARCHAR(30),
    CiudadNacimiento VARCHAR(30),
    EstadoCivil VARCHAR(30),
    NSS VARCHAR(15),
	RFC VARCHAR(15),
	CURP VARCHAR(18),
    UMF VARCHAR(3),
	NombreBeneficiario VARCHAR(50),
	Parentesco VARCHAR(30),
	FechaNacimientoBeneficiario DATE,
	EstadoPersonal BIT
);



-- Crear tabla Empleados
CREATE TABLE tblEmpleado (
    NumeroNomina INT PRIMARY KEY NOT NULL,
	IdPersona INT NOT NULL,
	IdPuesto INT,
	Nivel INT,
	TipoIngreso VARCHAR(50),
	Antiguedad DECIMAL,
	HorarioSemanal VARCHAR(50),
	EstadoEmpleado BIT,
);

--Crear tabla Usuarios
CREATE TABLE tblUsuarios (
    IdUsuario INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	NumeroNomina INT,
	NombreUsuario VARCHAR(50),
	Password VARCHAR(50),
	Nivel INT,
	EstadoUsuario BIT
);


Select * from tblUsuarios
--LLAVES FORANEAS
--ALTER TABLE tblPuestos 
--ADD CONSTRAINT FK_tblPuestos_tblEmpleado FOREIGN KEY (IdPuesto) REFERENCES tblEmpleado(IdPuesto)


--PROCEDIMIENTOS ALMACENADOS
/* PROCEDIMIENTOS ALMACENADOS DE Persona  */
/*Procedimiento almacenado para Guardar*/
CREATE PROCEDURE stp_personaydireccion_add
    @NombrePersonal VARCHAR(50),
    @Sexo VARCHAR(10),
    @FechaNacimiento DATE,
    @EntidadNacimiento VARCHAR(30),
    @CiudadNacimiento VARCHAR(30),
    @EstadoCivil VARCHAR(30),
    @NSS VARCHAR(15),
	@RFC VARCHAR(15),
	@CURP VARCHAR(18),
    @UMF VARCHAR(3),
	@NombreBeneficiario VARCHAR(50),
	@Parentesco VARCHAR(30),
	@FechaNacimientoBeneficiario DATE,
	@DomicilioIne VARCHAR(50),
    @Poblacion VARCHAR(50),
    @EntidadDireccion VARCHAR(50),
    @CP VARCHAR(50),
    @CorreoElectronico VARCHAR(50),
    @NumeroTelefono1 VARCHAR(15),
    @NumeroTelefono2 VARCHAR(15),
    @NumeroTelefonoEmergencia VARCHAR(15)
	
AS
BEGIN
    INSERT INTO tblPersonal(NombrePersonal, Sexo, FechaNacimiento, EntidadNacimiento,
	CiudadNacimiento, EstadoCivil, NSS, RFC, CURP, UMF, NombreBeneficiario, Parentesco
	,FechaNacimientoBeneficiario, EstadoPersonal)
    VALUES (@NombrePersonal, @Sexo, @FechaNacimiento, @EntidadNacimiento,
	@CiudadNacimiento, @EstadoCivil, @NSS, @RFC, @CURP, @UMF, @NombreBeneficiario, @Parentesco,
	@FechaNacimientoBeneficiario, 1);

	DECLARE @IdPersona INT = SCOPE_IDENTITY();

    -- Inserta en tblDireccion utilizando el IdPersona obtenido
    INSERT INTO tblDireccion (IdPersona, DomicilioIne, Poblacion, EntidadDireccion, CP, 
	CorreoElectronico, NumeroTelefono1, NumeroTelefono2, NumeroTelefonoEmergencia)
    VALUES (@IdPersona, @DomicilioIne, @Poblacion, @EntidadDireccion, @CP, 
	@CorreoElectronico, @NumeroTelefono1, @NumeroTelefono2, @NumeroTelefonoEmergencia);
END;

EXEC stp_personaydireccion_add 'Ortiz Varelas Daniel', 'M', '2004-06-28', 'Guanajuato', 
'Leon', 'Soltero', '1223123','OIVL09', 'OIVL021125HGTRRSA6', '12', 'Ortiz Acosta Paciano',
'Padre', '1975-03-09', 'Puerta de Jalpa', 'Purisima del Rincon', 'Guanajuato', '36430', 'varelasantobnio5308@gmail.com', '47613560', '47634', '476454'

EXEC stp_personaydireccion_add 'Juan Pérez','Masculino','1985-04-15','Ciudad de México','CDMX','Soltero','12345678901','JUPE850415123','JUPE850415HDFRNN09','55',
    'Ana Pérez','Esposa','1990-08-25','Calle Falsa 123','Ciudad de México','CDMX','01000','juan.perez@example.com','5555555555','5555555556','5555555557';

	select * from tblPersonal


EXEc stp_persona_getall

Select * from tblEmpleado



/*Procedimiento almacenado para Eliminar*/
/*DROP PROCEDURE stp_sexo_delete*/
CREATE PROCEDURE stp_persona_delete
    @IdPersona INT
AS
BEGIN
update tblPersonal
	set EstadoPersonal = 0
	where IdPersona = @IdPersona
END;
exec stp_persona_delete 2


/*Procedimiento almacenado para Actualizar*/
CREATE PROCEDURE stp_persona_update
	@IdPuesto INT,
    @NombrePuesto VARCHAR(50),
	@EstadoPuesto BIT
AS
BEGIN
update tblPuestos
	set NombrePuesto = @NombrePuesto, EstadoPuesto=@EstadoPuesto
	where IdPuesto = @IdPuesto
END;

/*Procedimiento almacenado para Obtener los datos activos*/
CREATE PROCEDURE stp_persona_getactive
AS
BEGIN
    SELECT * FROM tblPersonal
	where EstadoPersonal = 1
END;

/*Procedimiento almacenado para Obtener los datos activos*/
CREATE PROCEDURE stp_persona_getall
AS
BEGIN
    SELECT * FROM tblPersonal
END;

/* PROCEDIMIENTOS ALMACENADOS DE Departamento  */
/*Procedimiento almacenado para Guardar*/
CREATE PROCEDURE stp_departa_add
    @NombreDepartamento VARCHAR(50)
AS
BEGIN
    INSERT INTO tblDepartamentos(NombreDepartamento, EstadoDepartamento)
    VALUES (@NombreDepartamento, 1);
END;

/*Procedimiento almacenado para Eliminar*/
CREATE PROCEDURE stp_departamento_delete
    @IdDepartamento INT
AS
BEGIN
    update tblDepartamentos
	set EstadoDepartamento=0
	where IdDepartamento = @IdDepartamento
END;

/*Procedimiento almacenado para Actualizar*/
CREATE PROCEDURE stp_departamento_update
	@IdDepartamento INT,
    @NombreDepartamento VARCHAR(50),
	@EstadoDepartamento BIT
AS
BEGIN
update tblDepartamentos
	set NombreDepartamento = @NombreDepartamento, EstadoDepartamento=@EstadoDepartamento
	where IdDepartamento = @IdDepartamento
END;

/*Procedimiento almacenado para Obtener todos los datos*/
CREATE PROCEDURE stp_departamento_getactive
AS
BEGIN
    SELECT * FROM tblDepartamentos
	WHERE EstadoDepartamento = 1
END;

/*Procedimiento almacenado para Obtener todos los datos*/
CREATE PROCEDURE stp_departamento_getall
AS
BEGIN
    SELECT * FROM tblDepartamentos
END;






EXEC stp_departamento_getall
EXEC stp_puestos_getall



/* PROCEDIMIENTOS ALMACENADOS DE Direccion  */
/*Procedimiento almacenado para Guardar*/
CREATE PROCEDURE stp_direccion_add
    @IdPersona INT,
	@DomicilioIne VARCHAR(50),
	@Poblacion VARCHAR(50),
	@EntidadDireccion VARCHAR(50),
	@CP VARCHAR(50),
	@CorreoElectronico VARCHAR(50),
	@NumeroTelefono1 VARCHAR(15),
	@NumeroTelefono2 VARCHAR(15),
	@NumeroTelefonoEmergencia VARCHAR(15)
AS
BEGIN
    INSERT INTO tblDireccion(IdPersona, DomicilioIne, Poblacion, EntidadDireccion,
	CP, CorreoElectronico, NumeroTelefono1, NumeroTelefono2, NumeroTelefonoEmergencia)
    VALUES (@IdPersona, @DomicilioIne, @Poblacion, @EntidadDireccion, 
	@CP, @CorreoElectronico, @NumeroTelefono1, @NumeroTelefono2, @NumeroTelefonoEmergencia);
END;

EXEC stp_direccion_add 1, 'Benito Juarez', 'Puerta de Jalpa', 'Guanajuato', '36430', 
'lo3977884@gmail.com', '4761241', '476232', '47612123'

Select P.NombrePersonal, D.* from
tblPersonal P INNER JOIN tblDireccion D
ON P.IdPersona = D.IdPersona




/*Procedimiento almacenado para Eliminar*/
CREATE PROCEDURE stp_direccion_delete
    @IdDepartamento INT
AS
BEGIN
    update tblDireccion
	set EstadoDepartamento=0
	where IdDepartamento = @IdDepartamento
END;

/*Procedimiento almacenado para Actualizar*/
CREATE PROCEDURE stp_direccion_update
	@IdDepartamento INT,
    @NombreDepartamento VARCHAR(50),
	@EstadoDepartamento BIT
AS
BEGIN
update tblDepartamentos
	set NombreDepartamento = @NombreDepartamento, EstadoDepartamento=@EstadoDepartamento
	where IdDepartamento = @IdDepartamento
END;


/*Procedimiento almacenado para Obtener todos los datos*/
CREATE PROCEDURE stp_direccion_getall
AS
BEGIN
    SELECT * FROM tblDireccion
END;


/*Procedimiento Almacenado para almacenar Empleado*/
CREATE PROCEDURE stp_empleado_add
    @NumeroNomina INT,
	@IdPersona INT,
	@IdPuesto INT,
	@Nivel INT,
	@TipoIngreso VARCHAR(50),
	@Antiguedad DECIMAL,
	@HorarioSemanal VARCHAR(50)
AS
BEGIN
    INSERT INTO tblEmpleado(NumeroNomina, IdPersona,
	IdPuesto, Nivel, TipoIngreso, Antiguedad, HorarioSemanal, EstadoEmpleado)
    VALUES(@NumeroNomina, @IdPersona,
	@IdPuesto, @Nivel, @TipoIngreso, @Antiguedad, @HorarioSemanal, 1);
END;

/*Procedimiento Almacenado para almacenar Empleado*/
CREATE PROCEDURE stp_empleado_inactive
    @NumeroNomina INT
AS
BEGIN
    update tblEmpleado
	set EstadoEmpleado=0
	where NumeroNomina = @NumeroNomina
END;

/*Procedimiento Almacenado para obtener Empleados Activos*/
CREATE PROCEDURE stp_empleado_getactive
AS
BEGIN
    Select * from tblEmpleado
	where EstadoEmpleado = 1
END;

/*Procedimiento Almacenado para obtener Empleados Baja*/
CREATE PROCEDURE stp_empleado_getinactive
AS
BEGIN
    Select * from tblEmpleado
	where EstadoEmpleado = 0
END;

/*Procedimiento Almacenado para obtener todos los Empleados*/
CREATE PROCEDURE stp_empleado_getall
AS
BEGIN
    Select * from tblEmpleado
END;


EXEC stp_empleado_getactive







EXEC stp_puestos_add 'Coordinador del Sistema de Gestión de Calidad e Inocuidad'
EXEC stp_puestos_add 'Gestor documental'
EXEC stp_puestos_add 'Coordinador de Sanidad'
EXEC stp_puestos_add 'Analista de Sanidad '
EXEC stp_puestos_add 'Coordinador de Control de Calidad'
EXEC stp_puestos_add 'Fisico Químico'
EXEC stp_puestos_add 'Microbiología'
EXEC stp_puestos_add 'Analista de Calidad de Puestos'
EXEC stp_puestos_add 'Promotoria'

EXEC stp_puestos_getactive


CREATE PROCEDURE stp_empleados_getactive
AS
BEGIN
    SELECT * FROM tblEmpleado where EstadoEmpleado = 1
END;

EXEC stp_empleado_getinactive
