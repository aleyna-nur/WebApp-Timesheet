package com.marotech.MaroProject.Repository;

import com.marotech.MaroProject.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
