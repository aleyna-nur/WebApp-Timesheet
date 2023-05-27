package com.marotech.MaroProject.Entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "Timesheet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Timesheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    public Long id;

    public Long userId;

    public Long customerId;

    @Column(name = "Timesheet_Date")
    public Date timesheetDate;

    @Column(name = "Duration")
    public float duration;

    @Column(name = "Location",
            columnDefinition = "NVARCHAR(100)"
            )
    public String Location;

    public Long taskId;

    @Column(name = "Description",
            columnDefinition = "NVARCHAR(500)"
            )
    public String description;

    @Column(name = "Create_Date")
    public LocalDateTime createDate;

    @Column(name = "[Create_User]",
            columnDefinition = "NVARCHAR(100)"
            )
    public String createUser;


}
