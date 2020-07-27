package com.xebia.learningmanagement.config;

import com.xebia.learningmanagement.filter.JwtRequestFilter;
import com.xebia.learningmanagement.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.context.WebApplicationContext;

import javax.sql.DataSource;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserServiceImpl userService;

	@Autowired
	DataSource dataSource;

	@Autowired
	private JwtRequestFilter jwtRequestFilter;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Bean
	@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
	public Authentication getAuthentication(){
		return SecurityContextHolder.getContext().getAuthentication();
	}
	public void configure(AuthenticationManagerBuilder builder) throws Exception{
		builder.userDetailsService(userService).passwordEncoder(passwordEncoder);
	}
	protected void configure(HttpSecurity http) throws Exception{
		http.csrf().disable()
				.authorizeRequests().antMatchers("/v2/api-docs",
				"/configuration/ui",
				"/swagger-resources/**",
				"/configuration/security",
				"/swagger-ui.html",
				"/webjars/**").anonymous()
				.antMatchers("http://localhost:8082/swagger-ui.html#/").permitAll()
				.antMatchers("/addNewUsers").permitAll()
				.antMatchers("/username").permitAll()
				.antMatchers("/password").permitAll().antMatchers("/api").permitAll()
				.antMatchers("/admin").hasRole("ADMIN")
				.antMatchers("/superadmin").hasRole("SUPERADMIN")
				.antMatchers("/createUser").permitAll()
				.antMatchers("/api/createCategory").permitAll()
				.antMatchers("/api/getCompentency").permitAll()
				.antMatchers("/api/createCompentency").permitAll()
				.antMatchers("/api/getCategory/{code}").permitAll()
				.antMatchers("/api/getEmployee/{xebiaEmailID}").permitAll()
				.anyRequest().authenticated()
				.and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder(){
		return NoOpPasswordEncoder.getInstance();
	}
}
