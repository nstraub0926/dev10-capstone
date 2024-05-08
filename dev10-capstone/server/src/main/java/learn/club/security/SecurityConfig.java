package learn.club.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {
        // we're not using HTML forms in our app
        //so disable CSRF (Cross Site Request Forgery)
        http.csrf().disable();

        // this configures Spring Security to allow
        //CORS related requests (such as preflight checks)
        http.cors();

        // the order of the antMatchers() method calls is important
        // as they're evaluated in the order that they're added
        http.authorizeRequests()
                // new...
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/refresh_token").authenticated()
                .antMatchers("/create_account").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/club", "/club/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/club/*/member").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/club/*/event").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/club/*/booking").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/member", "/member/*", "/member/app_user/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/club-member", "/club-member/*", "/club-member/*/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/rsvp", "/rsvp/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/club/event/*", "/club/event/*/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/club/booking/*", "/club/booking/*/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/club/app_user/*").authenticated()
                .antMatchers(HttpMethod.POST,
                        "/club").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/member").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/club-member").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/rsvp").hasAnyAuthority("USER")
                .antMatchers(HttpMethod.POST,
                        "/club/event").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/club/booking").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/member/*").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/club/event/*").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/club/booking/*").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/club-member/*").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/member/*").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/club/event/*").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/club/booking/*").hasAnyAuthority("ADMIN")
                // if we get to this point, let's deny all requests
                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(authConfig), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
