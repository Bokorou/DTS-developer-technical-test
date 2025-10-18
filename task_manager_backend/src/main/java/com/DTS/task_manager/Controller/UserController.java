package com.DTS.task_manager.Controller;

import com.DTS.task_manager.DTO.CreateUserDto;
import com.DTS.task_manager.DTO.LoginDto;
import com.DTS.task_manager.DTO.TaskDto;
import com.DTS.task_manager.DTO.UserResponseDTO;
import com.DTS.task_manager.Entity.Task;
import com.DTS.task_manager.Exceptions.InvalidCredentialsException;
import com.DTS.task_manager.Exceptions.UserNotFoundException;
import com.DTS.task_manager.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
@AllArgsConstructor
@NoArgsConstructor
@Tag(name = "User API", description = "API for managing users and their tasks")
@CrossOrigin(origins = {"http://localhost:5173",
        "http://frontend:5173"})

public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "Authenticate a user", description = "Logs in a user using their credentials.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User successfully logged in",
                    content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials",
                    content = @Content(schema = @Schema(example = "{\"error\": \"Invalid credentials\"}")))
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto){
        try {
            UserResponseDTO responseDTO = userService.login(loginDto);
            return ResponseEntity.ok(responseDTO);
        } catch (UserNotFoundException | InvalidCredentialsException e) {
            Map<String, String> error = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @Operation(summary = "Create a new user", description = "Registers a new user in the system.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User successfully created",
                    content = @Content(schema = @Schema(implementation = UserResponseDTO.class)))
    })
    @PostMapping("/create")
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody CreateUserDto createUserDto){
        UserResponseDTO responseDTO = userService.createUser(createUserDto);

        return  ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @Operation(summary = "Get all tasks for a user", description = "Retrieves all tasks associated with a specific user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of user tasks retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Task.class)))),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{userId}/tasks")
    public ResponseEntity<List<Task>> getAllTasksByUserId(@PathVariable int userId){
        List<Task> tasks = userService.getAllTasksByUser(userId);

        return  ResponseEntity.status(HttpStatus.OK).body(tasks);
    }

    @Operation(summary = "Create a new task for a user", description = "Adds a new task to a user's task list.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task successfully created",
                    content = @Content(schema = @Schema(implementation = Task.class)))
    })
    @PostMapping("/{userId}/tasks")
    public ResponseEntity<Task> createTask(@Valid @PathVariable int userId, @RequestBody TaskDto taskDto){
        Task task = userService.createTask(userId, taskDto);
        return  ResponseEntity.status(HttpStatus.OK).body(task);
    }

    @Operation(summary = "Update a user task", description = "Updates an existing task for a specific user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task successfully updated",
                    content = @Content(schema = @Schema(implementation = Task.class))),
            @ApiResponse(responseCode = "404", description = "Task not found")
    })
    @PutMapping("/{userId}/tasks/{taskId}")
    public ResponseEntity<Task> updateTask(@Valid @PathVariable int userId,
                                           @PathVariable int taskId, @RequestBody TaskDto taskDto) {
        Task updatedTask = userService.updateTask(userId, taskId, taskDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedTask);
    }

    @Operation(summary = "Delete a task", description = "Deletes a task belonging to a specific user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task successfully deleted"),
            @ApiResponse(responseCode = "404", description = "Task not found")
    })
    @DeleteMapping("/{userId}/tasks/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable int userId, @PathVariable int taskId) {
        userService.deleteTask(taskId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
