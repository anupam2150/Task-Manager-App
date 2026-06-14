using System.ComponentModel.DataAnnotations;
using TaskManager.API.Models;

namespace TaskManager.API.DTOs;

public record ProjectDto(int Id, string Name, string Description, DateTime CreatedAt, int OwnerId);

public record CreateProjectDto(
    [Required, StringLength(100, MinimumLength = 1)] string Name,
    [StringLength(500)] string Description);

public record UpdateProjectDto(
    [Required, StringLength(100, MinimumLength = 1)] string Name,
    [StringLength(500)] string Description);

public record TaskDto(int Id, string Title, string Description, Models.TaskStatus Status,
    TaskPriority Priority, DateTime? DueDate, DateTime CreatedAt, int ProjectId, int? AssignedToId);

public record CreateTaskDto(
    [Required, StringLength(200, MinimumLength = 1)] string Title,
    [StringLength(1000)] string Description,
    TaskPriority Priority,
    DateTime? DueDate,
    int? AssignedToId);

public record UpdateTaskDto(
    [Required, StringLength(200, MinimumLength = 1)] string Title,
    [StringLength(1000)] string Description,
    Models.TaskStatus Status,
    TaskPriority Priority,
    DateTime? DueDate,
    int? AssignedToId);
