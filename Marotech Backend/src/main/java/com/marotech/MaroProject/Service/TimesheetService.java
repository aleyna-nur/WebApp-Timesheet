package com.marotech.MaroProject.Service;

import com.marotech.MaroProject.Entity.Timesheet;
import com.marotech.MaroProject.Repository.TimesheetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimesheetService {

    private final TimesheetRepository timesheetRepository;

    public TimesheetService(TimesheetRepository timesheetRepository) {
        this.timesheetRepository = timesheetRepository;
    }

    public List<Timesheet> GetTimesheets() {
        List<Timesheet> timesheets = timesheetRepository.findAll();
        return timesheets;
    }

    public Timesheet CreateTimesheet(Timesheet timesheet) {
        return timesheetRepository.save(timesheet);
    }

    public Optional<Timesheet> GetTimesheetById(long id) {
        return timesheetRepository.findById(id);
    }

    public void DeleteTimesheetById(long id) {
        timesheetRepository.deleteById(id);
    }

    public void DeleteTimesheets() {
        timesheetRepository.deleteAll();
    }
}
