namespace PomodoroTracker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FirstMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Pomodoroes",
                c => new
                    {
                        PomodoroID = c.Int(nullable: false, identity: true),
                        ProjectTaskID = c.Int(nullable: false),
                        StartTime = c.DateTime(nullable: false),
                        DurationInMinutes = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PomodoroID)
                .ForeignKey("dbo.ProjectTasks", t => t.ProjectTaskID, cascadeDelete: true)
                .Index(t => t.ProjectTaskID);
            
            CreateTable(
                "dbo.ProjectTasks",
                c => new
                    {
                        ProjectTaskID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        EstimatedPomodoroCount = c.Int(nullable: false),
                        ProjectID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectTaskID)
                .ForeignKey("dbo.Projects", t => t.ProjectID, cascadeDelete: true)
                .Index(t => t.ProjectID);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ProjectID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProjectTasks", "ProjectID", "dbo.Projects");
            DropForeignKey("dbo.Pomodoroes", "ProjectTaskID", "dbo.ProjectTasks");
            DropIndex("dbo.ProjectTasks", new[] { "ProjectID" });
            DropIndex("dbo.Pomodoroes", new[] { "ProjectTaskID" });
            DropTable("dbo.Projects");
            DropTable("dbo.ProjectTasks");
            DropTable("dbo.Pomodoroes");
        }
    }
}
