package com.DTS.task_manager.Mapper;

import com.DTS.task_manager.DTO.CreateUserDto;
import com.DTS.task_manager.DTO.UserResponseDTO;
import com.DTS.task_manager.Entity.Task;
import com.DTS.task_manager.Entity.User;

import java.util.ArrayList;

public class UserMapper {
    public static User toModel(CreateUserDto userDto){
        User newUser = new User();
        ArrayList<Task> emptyTaskList = new ArrayList<>();
        newUser.setUsername(userDto.getUsername());
        newUser.setPassword(userDto.getPassword());
        newUser.setTasks(emptyTaskList);

        return newUser;
    }

    public static UserResponseDTO toDTO(User user){
        UserResponseDTO responseDTO = new UserResponseDTO();

        responseDTO.setId((int)(long)user.getId());
        responseDTO.setUsername(user.getUsername());

        return responseDTO;
    }

}
