SELECT
    [taskId]
   ,[taskName]
   ,[statusTask]
   ,[taskDate] 
   ,[IsDelete]

FROM [dbo].[tasks]

WHERE [taskId] = @taskId