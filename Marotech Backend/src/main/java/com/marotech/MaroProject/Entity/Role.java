package com.marotech.MaroProject.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "[Role]")
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @Column(name = "Role_Name",
            columnDefinition = "NVARCHAR(100)"
            )
    public String name;

    @Column(name = "Description",
            columnDefinition = "NVARCHAR(200)")
    public String description;

}
