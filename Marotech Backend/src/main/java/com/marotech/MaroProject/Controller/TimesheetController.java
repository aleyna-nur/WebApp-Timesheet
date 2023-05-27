package com.marotech.MaroProject.Controller;

import com.marotech.MaroProject.Entity.Timesheet;
import com.marotech.MaroProject.Repository.TimesheetRepository;
import com.marotech.MaroProject.Service.TimesheetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "timesheet")
public class TimesheetController {

    private final TimesheetService timesheetService;
    private final TimesheetRepository timesheetRepository;

    public TimesheetController(TimesheetService timesheetService, TimesheetRepository timesheetRepository) {
        this.timesheetService = timesheetService;
        this.timesheetRepository = timesheetRepository;
    }

    @GetMapping("getTimesheets")
    public ResponseEntity<List<Timesheet>> GetTimesheets() {
        return ResponseEntity.ok(timesheetService.GetTimesheets());
    }

    @PostMapping("createTimesheet")
    public ResponseEntity<Timesheet> CreateTimesheet(@RequestBody Timesheet timesheet) {
        timesheet.setCreateDate(LocalDateTime.now());
        return ResponseEntity.ok(timesheetService.CreateTimesheet(timesheet));
    }

    @PostMapping("getTimesheetById")
    public ResponseEntity<Optional<Timesheet>> GetTimesheetById(@RequestBody long id) {

        Optional<Timesheet> foundTimesheet = timesheetService.GetTimesheetById(id);
        return ResponseEntity.ok(foundTimesheet);
    }

    @PutMapping("timesheet/{id}")
    public ResponseEntity<Timesheet> UpdateTimesheet(@PathVariable long id , @RequestBody Timesheet timesheet){
        Optional<Timesheet> timesheetData = timesheetRepository.findById(id);

        Timesheet timesheetUpdate = timesheetData.get();
        timesheetUpdate.setUserId(timesheet.getUserId());
        timesheetUpdate.setCustomerId(timesheet.getCustomerId());
        timesheetUpdate.setTimesheetDate(timesheet.getTimesheetDate());
        timesheetUpdate.setDuration(timesheet.getDuration());
        timesheetUpdate.setLocation(timesheet.getLocation());
        timesheetUpdate.setTaskId(timesheet.getTaskId());
        timesheetUpdate.setDescription(timesheet.getDescription());
        timesheetUpdate.setCreateDate(LocalDateTime.now());
        timesheetUpdate.setCreateUser(timesheet.getCreateUser());

        return new ResponseEntity<>(timesheetRepository.save(timesheetUpdate), HttpStatus.OK);
    }

    @DeleteMapping("deleteTimesheetById")
    public ResponseEntity<HttpStatus> DeleteTimesheet(@RequestBody long id) {
        timesheetService.DeleteTimesheetById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @DeleteMapping("deleteTimesheets")
    public ResponseEntity<HttpStatus> DeleteTimesheets(){
        timesheetService.DeleteTimesheets();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
