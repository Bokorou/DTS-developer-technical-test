package com.DTS.task_manager.DTO;

import com.DTS.task_manager.Entity.TaskStatus;
import com.DTS.task_manager.Entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TaskDto {

    @NotNull
    private String title;


    private String description;

    @NotNull
    private String status;

    @NotNull
    private String dueDate;

    @NotNull
    private String dueTime;
}
