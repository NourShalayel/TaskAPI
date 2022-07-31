UPDATE [dbo].[tasks]

  SET 
   [taskName] = @taskName
   ,[statusTask] = @statusTask
   ,[taskDate]  = @taskDate
   ,[IsDelete] = @IsDelete



SELECT
   
   [taskName]
   ,[statusTask]
   ,[taskDate] 
   ,[IsDelete]

FROM [dbo].[tasks]

WHERE [taskId] = @taskId