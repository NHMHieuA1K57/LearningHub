package swp.group2.learninghub.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
/*for login feature*/
public class LoginRequest{
        private String email;
        private String password;
}
