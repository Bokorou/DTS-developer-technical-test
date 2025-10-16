package com.DTS.task_manager.Mapper;

import com.DTS.task_manager.DTO.TaskDto;
import com.DTS.task_manager.Entity.Task;
import com.DTS.task_manager.Entity.TaskStatus;
import com.DTS.task_manager.Entity.User;
import com.DTS.task_manager.Exceptions.UserNotFoundException;
import com.DTS.task_manager.Repository.UserRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Component
public class TaskMapper {

    @Autowired
    private UserRepo userRepo;

    public  Task toModel(int userid, TaskDto taskDto){
        Task newTask = new Task();
        User user = userRepo.findById((long) userid).orElseThrow(
                () -> new UserNotFoundException("User not found"));;
        newTask.setTitle(taskDto.getTitle());
        newTask.setDescription(taskDto.getDescription());
        newTask.setUser(user);
        newTask.setStatus(TaskStatus.valueOf(taskDto.getStatus()));
        newTask.setDueDate(LocalDate.parse(taskDto.getDueDate()));
        newTask.setDueTime(LocalTime.parse(taskDto.getDueTime()));


        return newTask;

    }
}
