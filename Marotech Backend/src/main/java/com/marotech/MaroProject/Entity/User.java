package com.marotech.MaroProject.Entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "[User]")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    public Long id;

    @Column(name = "Name",
            columnDefinition = "NVARCHAR(200)")

    public String name;

    @Column(name = "Email",
            columnDefinition = "NVARCHAR(100)")
    public String email;

    @Column(name = "Create_Date")
    public LocalDateTime createDate;

    @Column(name = "Status",
            columnDefinition = "CHAR",
            length = 1)
    public String status;

    @Column(name = "Create_User",
            columnDefinition = "NVARCHAR(100)"
            )
    public String createUser;

    @Column(name = "[Role]",
            columnDefinition = "NVARCHAR(100)"
            )
    public String role;
}
