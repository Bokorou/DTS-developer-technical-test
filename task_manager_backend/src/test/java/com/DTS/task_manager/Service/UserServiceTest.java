package com.DTS.task_manager.Service;

import com.DTS.task_manager.DTO.CreateUserDto;
import com.DTS.task_manager.DTO.LoginDto;
import com.DTS.task_manager.DTO.TaskDto;
import com.DTS.task_manager.DTO.UserResponseDTO;
import com.DTS.task_manager.Entity.Task;
import com.DTS.task_manager.Entity.User;
import com.DTS.task_manager.Exceptions.InvalidCredentialsException;
import com.DTS.task_manager.Exceptions.UserNotFoundException;
import com.DTS.task_manager.Mapper.TaskMapper;
import com.DTS.task_manager.Repository.TaskRepo;
import com.DTS.task_manager.Repository.UserRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private TaskRepo taskRepo;

    @Mock
    private TaskMapper taskMapper;

    @InjectMocks
    private UserService userService;



    @Test
    void shouldReturnUserIfUsernameExistsAndPasswordMatches() throws InvalidCredentialsException {
        // Arrange
        User testUser = new User(1L, "tester123", "password", Collections.emptyList());
        when(userRepo.findByUsername("tester123")).thenReturn(Optional.of(testUser));

        LoginDto loginDto = new LoginDto("tester123", "password");

        // Act
        UserResponseDTO result = userService.login(loginDto);

        // Assert
        assertAll("user",
                () -> assertEquals("tester123", result.getUsername()),
                () -> assertEquals(1L, result.getId())
        );
    }

    @Test
    void shouldThrowInvalidCredentialsIfPasswordDoesNotMatch() {

        User testUser = new User(1L, "tester123", "password", Collections.emptyList());
        when(userRepo.findByUsername("tester123")).thenReturn(Optional.of(testUser));

        LoginDto loginDto = new LoginDto("tester123", "wrongpassword");


        assertThrows(InvalidCredentialsException.class, () -> userService.login(loginDto));
    }

    @Test
    void shouldReturnUserResponseDTOWhenUserCreated() {
        CreateUserDto createUserDto = new CreateUserDto("bokorou", "password1");

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setUsername("bokorou");
        savedUser.setPassword("password1");
        savedUser.setTasks(Collections.emptyList());

        when(userRepo.save(any(User.class))).thenReturn(savedUser);
        UserResponseDTO result = userService.createUser(createUserDto);

        assertAll("user",
                () -> assertNotNull(result),
                () -> assertEquals(1L, result.getId()),
                () -> assertEquals("bokorou", result.getUsername())
        );
    }


    @Test
    void shouldReturnTaskIfTaskCreated() {
        TaskDto taskDto = new TaskDto("New Task", "", "PENDING","2025-11-01", "23:00:00");

        User testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("tester");
        testUser.setPassword("password");
        testUser.setTasks(new ArrayList<>());

        Task savedTask = new Task();
        savedTask.setId(100L);
        savedTask.setTitle(taskDto.getTitle());
        savedTask.setDescription(taskDto.getDescription());
        savedTask.setUser(testUser);

        when(taskMapper.toModel(anyInt(), any(TaskDto.class))).thenReturn(savedTask);
        when(userRepo.findById(1L)).thenReturn(Optional.of(testUser));
        when(taskRepo.save(any(Task.class))).thenReturn(savedTask);

        Task result = userService.createTask(1, taskDto);

        assertAll("task",
                () -> assertNotNull(result),
                () -> assertEquals(100L, result.getId()),
                () -> assertEquals(taskDto.getTitle(), result.getTitle()),
                () -> assertEquals(taskDto.getDescription(), result.getDescription()),
                () -> assertEquals(testUser, result.getUser())
        );
        assertEquals(1, testUser.getTasks().size());
    }

}

