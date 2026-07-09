using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize]
public class DashboardController(AppDbContext db) : ControllerBase
{
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var projectIds = await db.Projects
            .Where(p => p.OwnerId == UserId)
            .Select(p => p.Id)
            .ToListAsync();

        var taskQuery = db.Tasks.Where(t => projectIds.Contains(t.ProjectId));
        var now = DateTime.UtcNow;

        var total = await taskQuery.CountAsync();
        var done = await taskQuery.CountAsync(t => t.Status == Models.TaskStatus.Done);

        var result = new
        {
            totalProjects = projectIds.Count,
            totalTasks = total,
            todo = await taskQuery.CountAsync(t => t.Status == Models.TaskStatus.Todo),
            inProgress = await taskQuery.CountAsync(t => t.Status == Models.TaskStatus.InProgress),
            done,
            overdue = await taskQuery.CountAsync(t => t.DueDate.HasValue && t.DueDate < now && t.Status != Models.TaskStatus.Done),
            dueSoon = await taskQuery.CountAsync(t => t.DueDate.HasValue && t.DueDate >= now && t.DueDate <= now.AddDays(3) && t.Status != Models.TaskStatus.Done),
            highPriority = await taskQuery.CountAsync(t => t.Priority == TaskPriority.High && t.Status != Models.TaskStatus.Done),
            completionRate = total == 0 ? 0 : (int)Math.Round((double)done / total * 100),
            recentTasks = await taskQuery
                .OrderByDescending(t => t.CreatedAt)
                .Take(10)
                .Select(t => new { t.Id, t.Title, t.Status, t.Priority, t.DueDate, t.ProjectId })
                .ToListAsync()
        };

        return Ok(result);
    }
}
