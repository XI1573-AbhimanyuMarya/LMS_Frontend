package com.xebia.learningmanagement.model;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table
public class Skills {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String categoryCd;
	private String subCategoryCd;
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	private Date updatedAt;
}
