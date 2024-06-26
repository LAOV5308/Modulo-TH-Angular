USE [EmpleadosDB]

Select * from tblPersonal

GO
/****** Object:  StoredProcedure [dbo].[stp_personaydireccion_add]    Script Date: 16/05/2024 03:35:42 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
DROP Procedure stp_personaydireccion_add

CREATE PROCEDURE [dbo].[stp_personaall_add]
    @Nombre VARCHAR(50),
	@Apellidos VARCHAR(50),
    @Sexo VARCHAR(10),
    @EstadoCivil VARCHAR(30),
    @FechaNacimiento DATE,
    @EntidadNacimiento VARCHAR(30),
    @CiudadNacimiento VARCHAR(30),
	@CURP VARCHAR(18),
	@RFC VARCHAR(15),
    @NSS VARCHAR(15),
    @UMF VARCHAR(3),
	--Informacion Laboral
	@NoNomina INT,
	@Nivel VARCHAR(50),
	@IdDepartamento INT,
	@IdPuesto INT,
	@Responsable VARCHAR(50),
	@TipoIngreso VARCHAR(50),
	@Ingreso DATE,
	@HorarioSemanal VARCHAR(50),
	--Domicilio
	@DomicilioIne VARCHAR(50),
    @Poblacion VARCHAR(50),
    @EntidadDireccion VARCHAR(50),
	  @CP VARCHAR(50),
    @CorreoElectronico VARCHAR(50),
    @NumeroTelefono1 VARCHAR(15),
    @NumeroTelefono2 VARCHAR(15),
	--Contacto de Emergencia
	@NombreBeneficiario VARCHAR(50),
	@Parentesco VARCHAR(30),
	@FechaNacimientoBeneficiario DATE,
    @NumeroTelefonoEmergencia VARCHAR(15)
	
AS
BEGIN
    -- Inserta en tblPersona
    INSERT INTO tblPersonal(Nombre, Apellidos, Sexo, EstadoCivil,FechaNacimiento, EntidadNacimiento,
	CiudadNacimiento, CURP, RFC, NSS, UMF, EstadoPersona)
    VALUES (@Nombre, @Apellidos, @Sexo, @EstadoCivil,@FechaNacimiento, @EntidadNacimiento,
	@CiudadNacimiento, @CURP, @RFC, @NSS, @UMF, 1);

	DECLARE @IdPersona INT = SCOPE_IDENTITY();

    -- Inserta en tblDomicilio utilizando el IdPersona obtenido
    INSERT INTO tblDomicilio(IdPersona, DomicilioIne, Poblacion, EntidadDireccion, CP, 
	CorreoElectronico, NumeroTelefono1, NumeroTelefono2)
    VALUES (@IdPersona, @DomicilioIne, @Poblacion, @EntidadDireccion, @CP, 
	@CorreoElectronico, @NumeroTelefono1, @NumeroTelefono2);

  -- Inserta en tblContactoEmergencia utilizando el IdPersona obtenido
    INSERT INTO tblContactoEmergencia(IdPersona, NombreBeneficiario, Parentesco,
    FechaNacimientoBeneficiario, NumeroTelefonoEmergencia)
    VALUES(@IdPersona, @NombreBeneficiario, @Parentesco,
    @FechaNacimientoBeneficiario, @NumeroTelefonoEmergencia);

 -- Inserts en Empleados utilizando el IdPersona Obtenido
    INSERT INTO Empleados(NoNomina, IdPersona, Nivel, IdDepartamento, IdPuesto, Responsable, TipoIngreso, Ingreso, HorarioSemanal, EstadoEmpleado)
    Values(@NoNomina, @IdPersona, @Nivel, @IdDepartamento, @IdPuesto, @Responsable, @TipoIngreso, @Ingreso, @HorarioSemanal, 1);

END;


--Insertar Datos
EXEC stp_personaall_add 'Juan Pérez','Masculino','1985-04-15','Ciudad de México','CDMX','Soltero','12345678901','JUPE850415123','JUPE850415HDFRNN09','55',
    'Ana Pérez','Esposa','1990-08-25','Calle Falsa 123','Ciudad de México','CDMX','01000','juan.perez@example.com','5555555555','5555555556','5555555557';


EXEC stp_personaall_add 'Luis Antonio', 'Ortiz Varelas', 'Masculino','Soltero', '2002-11-25','Guanajuato','Leon','OIVL021125HGTRRSA','3454','233','umf',
1010, '3', 2, 2, 'Responsable', 'Nuevo', '2024-03-03', 'Matutino', 'Puerta de Jalpa', 'Puerta', 'Guanajuato', '36430', 'lo397884@gmail.com', '47623', '47623',
'Dulce', 'Madre', '1983-08-05','47613560'

EXEC stp_personaall_add 'Daniel', 'Ortiz Varelas', 'Masculino','Soltero', '2004-11-25','Guanajuato','Leon','OIVL021125HGTRRS2','3454','233','umf',
1012, '3', 2, 2, 'Responsable', 'Nuevo', '2024-03-03', 'Matutino', 'Puerta de Jalpa', 'Puerta', 'Guanajuato', '36430', 'lo397884@gmail.com', '47623', '47623',
'Dulce', 'Madre', '1983-08-05','47613560'

Delete from Empleados where NoNomina = 1011
select * from Empleados
Select * from tblPersonal
Select * from tblDomicilio
SELECT * FROM tblContactoEmergencia

create view V_empleadosgral as


Select E.NumeroNomina, P.NombrePersonal AS Nombre, E.Nivel,D.NombreDepartamento as Departamento,
PT.NombrePuesto as Puesto, PRS.NombrePersonal AS Responsable, E.TipoIngreso, E.Ingreso, E.Antiguedad, E.HorarioSemanal,
DI.CorreoElectronico, DI.NumeroTelefono1, P.NSS, P.UMF, P.EstadoCivil, P.Sexo, P.FechaNacimiento,
P.EntidadNacimiento, P.CiudadNacimiento, P.RFC, P.CURP, DI.DomicilioIne, DI.Poblacion, DI.EntidadDireccion,
DI.CP, DI.NumeroTelefono2, P.NombreBeneficiario, P.Parentesco, P.FechaNacimientoBeneficiario,
Di.NumeroTelefonoEmergencia

from Empleados E Inner Join tblPersonal P
ON E.IdPersona = P.IdPersona
INNER JOIN tblDomicilio DM
ON DM.IdPersona = P.IdPersona
INNER JOIN tblContactoEmergencia CE
ON E.IdPersona = CE.IdPersona

INNER JOIN tblDepartamentos D
ON PT.IdDepartamento = D.IdDepartamento
INNER JOIN tblEmpleado EP
ON EP.NumeroNomina = D.NumeroNomina
INNER JOIN tblPersonal PRS
ON EP.IdPersona = PRS.IdPersona

--Drop View V_empleadosgral

Select * from tblEmpleado

Select * from V_empleadosgral EG

