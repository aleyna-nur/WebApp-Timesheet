package com.marotech.MaroProject.Repository;

import com.marotech.MaroProject.Entity.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {
}
