CREATE DATABASE [ferropapus]

CREATE TABLE [dbo].[Clientes](
	[ID_Cliente] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_Cliente] [varchar](50) NULL,
	[Direccion_Cliente] [varchar](255) NULL,
	[Telefono_Cliente] [varchar](20) NULL,
	[Email_Cliente] [varchar](50) NULL,
	[activo] [bit] NULL,
 CONSTRAINT [PK__Clientes__E005FBFF03E87B8E] PRIMARY KEY CLUSTERED 
(
	[ID_Cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empleados]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleados](
	[ID_Empleado] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_Empleado] [varchar](50) NULL,
	[Direccion_Empleado] [varchar](255) NULL,
	[Telefono_Empleado] [varchar](20) NULL,
	[Email_Empleado] [varchar](50) NULL,
	[Cargo_Empleado] [varchar](50) NULL,
	[activo] [bit] NULL,
	[password] [nvarchar](max) NULL,
	[Nombre_Usuario] [nvarchar](50) NULL,
 CONSTRAINT [PK__Empleado__B7872C9077ABD0F1] PRIMARY KEY CLUSTERED 
(
	[ID_Empleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Marcas]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Marcas](
	[ID_Marca] [int] IDENTITY(1,1) NOT NULL,
	[ID_Proveedor] [int] NOT NULL,
	[Nombre_Marca] [varchar](50) NULL,
	[activo] [bit] NULL,
 CONSTRAINT [PK__Marcas__9B8F8DB2BF67BBCC] PRIMARY KEY CLUSTERED 
(
	[ID_Marca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productos](
	[ID_Producto] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_Producto] [varchar](50) NULL,
	[Descripcion_Producto] [varchar](255) NULL,
	[Marca_Producto] [varchar](50) NULL,
	[Precio_Producto] [money] NULL,
	[ID_Categoria] [int] NOT NULL,
	[Stock_Disponible] [int] NULL,
	[ID_Marca] [int] NOT NULL,
	[activo] [bit] NULL,
 CONSTRAINT [PK__Producto__9B4120E2F10D4AD5] PRIMARY KEY CLUSTERED 
(
	[ID_Producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Proveedores]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proveedores](
	[ID_Proveedor] [int] IDENTITY(1,1) NOT NULL,
	[Nombre_Proveedor] [varchar](50) NULL,
	[Direccion_Proveedor] [varchar](255) NULL,
	[Telefono_Proveedor] [varchar](20) NULL,
	[Email_Proveedor] [varchar](50) NULL,
	[activo] [bit] NULL,
 CONSTRAINT [PK__Proveedo__7D65272F11E8D19D] PRIMARY KEY CLUSTERED 
(
	[ID_Proveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ventas]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ventas](
	[ID_Venta] [int] IDENTITY(1,1) NOT NULL,
	[Fecha_Venta] [date] NULL,
	[Total_Venta] [money] NULL,
	[ID_Cliente] [int] NULL,
	[ID_Empleado] [int] NULL,
	[activo] [bit] NULL,
 CONSTRAINT [PK__Ventas__3CD842E5F6CC3FB4] PRIMARY KEY CLUSTERED 
(
	[ID_Venta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[stp_categoria_add]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_categoria_add]
(
	@Nombre_Categoria nvarchar(50),
	@activo bit = 1
)
as
begin
	insert into Categorias values (@Nombre_Categoria, @activo)
	end
GO
/****** Object:  StoredProcedure [dbo].[stp_categoria_delete]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_categoria_delete]
	@ID_Categoria int
as
begin
	update Categorias
	set activo = 0
	where ID_Categoria = @ID_Categoria
end
GO
/****** Object:  StoredProcedure [dbo].[stp_categoria_getall]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_categoria_getall]
as
begin
	select * from Categorias
end
GO
/****** Object:  StoredProcedure [dbo].[stp_categoria_getbyid]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_categoria_getbyid]
	@ID_Categoria int
as
	set nocount on;
	select * from Categorias where ID_Categoria = @ID_Categoria
GO
/****** Object:  StoredProcedure [dbo].[stp_categoria_update]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_categoria_update]
(
	@ID_Categoria int,
	@Nombre_Categoria nvarchar(50)
)
as
begin
	update Categorias
	set Nombre_Categoria = @Nombre_Categoria
	where ID_Categoria = @ID_Categoria
end
GO
/****** Object:  StoredProcedure [dbo].[stp_cliente_add]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_cliente_add]
(
	@Nombre_Cliente nvarchar(50),
	@Direccion_Cliente nvarchar(50),
	@Telefono_Cliente nvarchar(255),
	@Email_Cliente nvarchar(50),
	@activo bit = 1
)
as
begin
	insert into Clientes values (@Nombre_Cliente, @Direccion_Cliente,@Telefono_Cliente,@Email_Cliente, @activo)
	end
GO
/****** Object:  StoredProcedure [dbo].[stp_cliente_delete]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_cliente_delete]
	@ID_Cliente int
as
begin
	update Clientes
	set activo = 0
	where ID_Cliente = @ID_Cliente
end
GO
/****** Object:  StoredProcedure [dbo].[stp_cliente_getall]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_cliente_getall]
as
begin
	select * from Clientes
end
GO
/****** Object:  StoredProcedure [dbo].[stp_cliente_getbyid]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_cliente_getbyid]
	@ID_Cliente int
as
	set nocount on;
	select * from Clientes where ID_Cliente = @ID_Cliente
GO
/****** Object:  StoredProcedure [dbo].[stp_cliente_update]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_cliente_update]
(
	@ID_Cliente int,
	@Direccion_Cliente nvarchar(255),
	@Nombre_Cliente nvarchar(50),
	@Email_Cliente nvarchar(50),
	@Telefono_Cliente nvarchar(50)
)
as
begin
	update Clientes
	set Nombre_Cliente = @Nombre_Cliente
	where ID_Cliente = @ID_Cliente

	update Clientes
	set Direccion_Cliente = @Direccion_Cliente
	where ID_Cliente = @ID_Cliente
	update Clientes
	set Email_Cliente = @Email_Cliente
	where ID_Cliente = @ID_Cliente

	update Clientes
	set Telefono_Cliente = @Telefono_Cliente
	where ID_Cliente = @ID_Cliente
end
GO
/****** Object:  StoredProcedure [dbo].[stp_empleado_add]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_empleado_add]
(
	@Nombre_Empleado nvarchar(50),
	@Direccion_Empleado nvarchar(255),
	@Telefono_Empleado nvarchar(50),
	@Email_Empleado nvarchar(50),
	@Cargo_Empleado nvarchar(50),
	@password nvarchar(max),
	@Nombre_Usuario nvarchar(50),
	@activo bit = 1
)
as
begin
	insert into Empleados values (@Nombre_Empleado, @Direccion_Empleado, @Telefono_Empleado, @Email_Empleado,
	@Cargo_Empleado, @activo, @password, @Nombre_Usuario)
	end
GO
/****** Object:  StoredProcedure [dbo].[stp_empleado_delete]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_empleado_delete]
	@ID_Empleado int
as
begin
	update Empleados
	set activo = 0
	where ID_Empleado = @ID_Empleado
end
GO
/****** Object:  StoredProcedure [dbo].[stp_empleado_getall]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_empleado_getall]
as
begin
	select * from Empleados
end
GO
/****** Object:  StoredProcedure [dbo].[stp_empleado_getbyid]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_empleado_getbyid]
	@ID_Empleado int
as
	set nocount on;
	select * from Empleados where ID_Empleado = @ID_Empleado
GO
/****** Object:  StoredProcedure [dbo].[stp_empleado_update]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_empleado_update]
(
	@ID_Empleado int,
	@Nombre_Empleado nvarchar(50),
	@Direccion_Empleado nvarchar(255),
	@Telefono_Empleado nvarchar(50),
	@Email_Empleado nvarchar(50),
	@Cargo_Empleado nvarchar(50),
	@password nvarchar(max),
	@Nombre_Usuario nvarchar(50)
)
as
begin
	update Empleados
	set Nombre_Empleado = @Nombre_Empleado
	where ID_Empleado = @ID_Empleado
	update Empleados
	set Direccion_Empleado = @Direccion_Empleado
	where ID_Empleado = @ID_Empleado
	update Empleados
	set Telefono_Empleado = @Telefono_Empleado
	where ID_Empleado = @ID_Empleado
	update Empleados
	set Email_Empleado = @Email_Empleado
	where ID_Empleado = @ID_Empleado
	update Empleados
	set Cargo_Empleado = @Cargo_Empleado
	where ID_Empleado = @ID_Empleado
	update Empleados
	set [password] = @password
	where ID_Empleado = @ID_Empleado
	update Empleados
	set Nombre_Usuario = @Nombre_Usuario
	where ID_Empleado = @ID_Empleado
end
GO
/****** Object:  StoredProcedure [dbo].[stp_marcas_add]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_marcas_add]
(
	@ID_Proveedor int,
	@Nombre_Marca nvarchar(50),
	@activo bit = 1
)
as
begin
	insert into Marcas values (@ID_Proveedor, @Nombre_Marca, @activo)
	end
GO
/****** Object:  StoredProcedure [dbo].[stp_marcas_delete]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[stp_marcas_delete]
	@ID_Marca int
as
begin
	update Marcas
	set activo = 0
	where ID_Marca = @ID_Marca
end
GO
/****** Object:  StoredProcedure [dbo].[stp_marcas_getall]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_marcas_getall]
as
begin
	select * from Marcas
end
GO
/****** Object:  StoredProcedure [dbo].[stp_marcas_getbyid]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_marcas_getbyid]
	@ID_Marca int
as
	set nocount on;
	select * from Marcas where ID_Marca = @ID_Marca
GO
/****** Object:  StoredProcedure [dbo].[stp_marcas_update]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[stp_marcas_update]
(
	@ID_Marca int,
	@ID_Proveedor int,
	@Nombre_Marca nvarchar(50)
)
as
begin
	update Marcas
	set Nombre_Marca = @Nombre_Marca
	where ID_Marca = @ID_Marca

	update Marcas
	set ID_Proveedor = @ID_Proveedor
	where ID_Marca = @ID_Marca
end
GO
/****** Object:  StoredProcedure [dbo].[stp_producto_add]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[stp_producto_add]
(
	@Nombre_Producto nvarchar(50),
	@Descripcion_Producto nvarchar(255),
	@Marca_Producto nvarchar(50),
	@Precio_Producto money,
	@ID_Categoria nvarchar(50),
	@Stock_Disponible int,
	@ID_Marca int,
	@activo bit = 1
)
as
begin
	insert into Productos values (@Nombre_Producto,@Descripcion_Producto,@Marca_Producto,
	@Precio_Producto, @ID_Categoria, @Stock_Disponible, @ID_Marca, @activo)
	end
GO
/****** Object:  StoredProcedure [dbo].[stp_producto_delete]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_producto_delete]
	@ID_Producto int
as
begin
	update Productos
	set activo = 0
	where ID_Producto = @ID_Producto
end
GO
/****** Object:  StoredProcedure [dbo].[stp_producto_getall]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_producto_getall]
as
begin
	select * from Productos
end
GO
/****** Object:  StoredProcedure [dbo].[stp_producto_getbyid]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_producto_getbyid]
	@ID_Producto int
as
	set nocount on;
	select * from Productos where ID_Producto = @ID_Producto
GO
/****** Object:  StoredProcedure [dbo].[stp_producto_update]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_producto_update]
(
	@ID_Producto int,
	@Nombre_Producto nvarchar(50),
	@Descripcion_Producto nvarchar(255),
	@Marca_Producto nvarchar(50),
	@Precio_Producto money,
	@ID_Categoria int,
	@Stock_Disponible int,
	@ID_Marca int
)
as
begin
	update Productos
	set Nombre_Producto = @Nombre_Producto
	where ID_Producto = @ID_Producto
	update Productos
	set Descripcion_Producto = @Descripcion_Producto
	where ID_Producto = @ID_Producto
	update Productos
	set Marca_Producto = @Marca_Producto
	where ID_Producto = @ID_Producto
	update Productos
	set Precio_Producto = @Precio_Producto
	where ID_Producto = @ID_Producto
	update Productos
	set ID_Categoria = @ID_Categoria
	where ID_Producto = @ID_Producto
	update Productos
	set Stock_Disponible = @Stock_Disponible
	where ID_Producto = @ID_Producto
	update Productos
	set ID_Marca = @ID_Marca
	where ID_Producto = @ID_Producto
end
GO
/****** Object:  StoredProcedure [dbo].[stp_proveedor_add]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_proveedor_add]
(
	@Nombre_Proveedor nvarchar(50),
	@Direccion_Proveedor nvarchar(50),
	@Telefono_Proveedor nvarchar(255),
	@Email_Proveedor nvarchar(50),
	@activo bit = 1
)
as
begin
	insert into Proveedores values (@Nombre_Proveedor, @Direccion_Proveedor,@Telefono_Proveedor,@Email_Proveedor, @activo)
	end
GO
/****** Object:  StoredProcedure [dbo].[stp_proveedor_delete]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_proveedor_delete]
	@ID_Proveedor int
as
begin
	update Proveedores
	set activo = 0
	where ID_Proveedor = @ID_Proveedor
end
GO
/****** Object:  StoredProcedure [dbo].[stp_proveedor_getall]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_proveedor_getall]
as
begin
	select * from Proveedores
end
GO
/****** Object:  StoredProcedure [dbo].[stp_proveedor_getbyid]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_proveedor_getbyid]
	@ID_Proveedor int
as
	set nocount on;
	select * from Proveedores where ID_Proveedor = @ID_Proveedor
GO
/****** Object:  StoredProcedure [dbo].[stp_proveedor_update]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_proveedor_update]
(
	@ID_Proveedor int,
	@Direccion_Proveedor nvarchar(255),
	@Nombre_Proveedor nvarchar(50),
	@Email_Proveedor nvarchar(50),
	@Telefono_Proveedor nvarchar(50)
)
as
begin
	update Proveedores
	set Nombre_Proveedor = @Nombre_Proveedor
	where ID_Proveedor = @ID_Proveedor

	update Proveedores
	set Direccion_Proveedor = @Direccion_Proveedor
	where ID_Proveedor = @ID_Proveedor

	update Proveedores
	set Email_Proveedor = @Email_Proveedor
	where ID_Proveedor = @ID_Proveedor

	update Proveedores
	set Telefono_Proveedor = @Telefono_Proveedor
	where ID_Proveedor = @ID_Proveedor
end
GO
/****** Object:  StoredProcedure [dbo].[stp_venta_add]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_venta_add]
(
	@Fecha_Venta date,
	@Total_Venta money,
	@ID_Cliente int,
	@ID_Empleado int,
	@activo bit = 1
)
as
begin
	insert into Ventas values (@Fecha_Venta, @Total_Venta,@ID_Cliente,@ID_Empleado, @activo)
	end
GO
/****** Object:  StoredProcedure [dbo].[stp_venta_delete]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_venta_delete]
	@ID_Venta int
as
begin
	update Ventas
	set activo = 0
	where ID_Venta = @ID_Venta
end
GO
/****** Object:  StoredProcedure [dbo].[stp_venta_getall]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_venta_getall]
as
begin
	select * from Ventas
end
GO
/****** Object:  StoredProcedure [dbo].[stp_venta_getbyid]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_venta_getbyid]
	@ID_Venta int
as
	set nocount on;
	select * from Ventas where ID_Venta= @ID_Venta
GO
/****** Object:  StoredProcedure [dbo].[stp_venta_update]    Script Date: 02/03/2023 07:32:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[stp_venta_update]
(
	@ID_Venta int,
	@Fecha_Venta date,
	@Total_Venta money,
	@ID_Cliente int,
	@ID_Empleado int
)
as
begin
	update Ventas
	set Fecha_Venta = @Fecha_Venta
	where ID_Venta = @ID_Venta

	update Ventas
	set Total_Venta = @Total_Venta
	where ID_Venta = @ID_Venta

	update Ventas
	set ID_Cliente = @ID_Cliente
	where ID_Venta = @ID_Venta

	update Ventas
	set ID_Empleado = @ID_Empleado
	where ID_Venta = @ID_Venta
end
GO
USE [master]
GO
ALTER DATABASE [ferropapus] SET  READ_WRITE 
GO
