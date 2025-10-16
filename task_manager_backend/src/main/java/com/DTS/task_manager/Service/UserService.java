package com.DTS.task_manager.Service;

import com.DTS.task_manager.DTO.CreateUserDto;
import com.DTS.task_manager.DTO.LoginDto;
import com.DTS.task_manager.DTO.TaskDto;
import com.DTS.task_manager.Entity.Task;
import com.DTS.task_manager.Entity.User;
import com.DTS.task_manager.Exceptions.TaskNotFoundException;
import com.DTS.task_manager.Exceptions.UserNotFoundException;
import com.DTS.task_manager.Mapper.TaskMapper;
import com.DTS.task_manager.Mapper.UserMapper;
import com.DTS.task_manager.Repository.TaskRepo;
import com.DTS.task_manager.Repository.UserRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TaskRepo taskRepo;
    
    @Autowired
    private TaskMapper taskMapper;

    private User getUserById(long userId) {
        return userRepo.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User not found"));
    }

    public Optional<User> login(LoginDto loginDto) {
        Optional<User> user = userRepo.findByUsername(loginDto.getUsername());
        return user;
    }

    public User createUser(CreateUserDto createUserDto) {
        User newUser = UserMapper.toModel(createUserDto);

        return userRepo.save(newUser);
    }

    public List<Task> getAllTasksByUser(int userId) {
        User user = getUserById((long) userId);

        return user.getTasks();
    }

    public Task createTask(int userId, TaskDto taskDto){
        Task newTask = taskMapper.toModel(userId, taskDto);


        return taskRepo.save(newTask);
    }

    public Task updateTask(int userId, int taskId, TaskDto taskDto) {

        Task updatedTask = taskRepo.findById((long)(taskId)).orElseThrow(
                () -> new TaskNotFoundException("Task not found"));

        updatedTask.setTitle(taskDto.getTitle());
        updatedTask.setDescription(taskDto.getDescription());
        updatedTask.setDueDate(LocalDate.parse(taskDto.getDueDate()));
        updatedTask.setDueTime(LocalTime.parse(taskDto.getDueTime()));

        return taskRepo.save(updatedTask);
    }

    public void deleteTask(int taskId) {

        taskRepo.deleteById((long) taskId);

    }
}













