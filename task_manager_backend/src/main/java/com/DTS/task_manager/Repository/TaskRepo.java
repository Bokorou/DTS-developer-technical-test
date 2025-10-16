package com.DTS.task_manager.Repository;

import com.DTS.task_manager.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task, Long> {

}
