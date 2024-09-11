package swp.group2.learninghub.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@Entity
public class User {
    @Id
    private String email;
    private String realName;
    private String phoneNum;
    private String password;
    private String roleId;
    private boolean isActive;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date signupDate;

    public User() {
    }

    public User(String email, String realName, String phoneNum, String password, String roleId, boolean isActive, Date signupDate) {
        this.email = email;
        this.realName = realName;
        this.phoneNum = phoneNum;
        this.password = password;
        this.roleId = roleId;
        this.isActive = isActive;
        this.signupDate = signupDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        /*encode password*/
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Date getSignupDate() {
        return signupDate;
    }

    public void setSignupDate(Date signupDate) {
        this.signupDate = signupDate;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", realName='" + realName + '\'' +
                ", phoneNum='" + phoneNum + '\'' +
                ", password='" + password + '\'' +
                ", roleId='" + roleId + '\'' +
                ", isActive=" + isActive +
                ", signupDate=" + signupDate +
                '}';
    }
}
