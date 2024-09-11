package swp.group2.learninghub.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePass {
    /*Model for change password function*/
    private String oldpass;
    private String verpass;
    private String newpass;
}
