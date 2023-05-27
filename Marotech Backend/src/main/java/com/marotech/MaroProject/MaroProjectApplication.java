package  com.marotech.MaroProject;
import lombok.NonNull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;

@SpringBootApplication
public class MaroProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(MaroProjectApplication.class, args);
	}

}
