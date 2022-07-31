INSERT INTO [dbo].[tasks]
(
   [taskName]
   ,[statusTask]
   ,[taskDate] 
   ,[IsDelete]

) 

VALUES (
    @taskName , 
    @taskDate , 
    @statusTask ,
    @IsDelete
)

SELECT SCOPE_IDENTITY() AS taskId