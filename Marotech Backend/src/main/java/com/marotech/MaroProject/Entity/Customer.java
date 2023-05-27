package com.marotech.MaroProject.Entity;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Table(name = "[Customer]")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    public Long id;

    @Column(name = "Name",
            columnDefinition = "NVARCHAR(100)"
            )
    public String name;

    @Column(name = "Location",
            columnDefinition = "NVARCHAR(100)")
    public String location;

    @Column(name = "Status",
            columnDefinition = "CHAR(1)"
            )
    public String status;

    @Column(name = "Create_Date")
    public LocalDateTime createDate;

    @Column(name = "[Create_User]",
            columnDefinition = "NVARCHAR(100)")
    public String createUser;

}
