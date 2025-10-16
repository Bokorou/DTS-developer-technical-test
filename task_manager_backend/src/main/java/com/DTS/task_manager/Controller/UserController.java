package com.DTS.task_manager.Controller;

import com.DTS.task_manager.DTO.CreateUserDto;
import com.DTS.task_manager.DTO.LoginDto;
import com.DTS.task_manager.DTO.TaskDto;
import com.DTS.task_manager.Entity.Task;
import com.DTS.task_manager.Entity.User;
import com.DTS.task_manager.Service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Optional<User>> login(@Valid @RequestBody LoginDto loginDto){
        Optional<User> userOptional = userService.login(loginDto);
        if (userOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(userOptional);
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserDto createUserDto){
        User newUser = userService.createUser(createUserDto);

        return  ResponseEntity.status(HttpStatus.OK).body(newUser);
    }

    @GetMapping("/{userId}/tasks")
    public ResponseEntity<List<Task>> getAllTasksByUserId(@PathVariable int userId){
        List<Task> tasks = userService.getAllTasksByUser(userId);

        return  ResponseEntity.status(HttpStatus.OK).body(tasks);
    }

    @PostMapping("/{userId}/tasks")
    public ResponseEntity<Task> createTask(@Valid @PathVariable int userId, @RequestBody TaskDto taskDto){
        Task task = userService.createTask(userId, taskDto);
        return  ResponseEntity.status(HttpStatus.OK).body(task);
    }

    @PutMapping("/{userId}/tasks/{taskId}")
    public ResponseEntity<Task> updateTask(@Valid @PathVariable int userId,
                                           @PathVariable int taskId, @RequestBody TaskDto taskDto) {
        Task updatedTask = userService.updateTask(userId, taskId, taskDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedTask);
    }

    @DeleteMapping("/{userId}/tasks/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable int userId, @PathVariable int taskId) {
        userService.deleteTask(taskId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
