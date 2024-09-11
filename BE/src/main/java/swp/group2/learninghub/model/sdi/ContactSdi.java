package swp.group2.learninghub.model.sdi;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactSdi {
    private String name;
    private String phone;
    private String email;
    private String mess;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMess() {
        return mess;
    }

    public void setMess(String mess) {
        this.mess = mess;
    }
}
