package com.marotech.MaroProject.Entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "[Task]")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    public Long id;

    @Column(name = "Name",
            columnDefinition = "NVARCHAR(100)"
            )
    public String name;

    @Column(name = "Description",
            columnDefinition = "NVARCHAR(500)")
    public String description;

}
