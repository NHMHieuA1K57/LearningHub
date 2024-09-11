package swp.group2.learninghub.api;

import jakarta.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import swp.group2.learninghub.model.ChangePass;
import swp.group2.learninghub.model.LoginRequest;
import swp.group2.learninghub.model.ResponseObject;
import swp.group2.learninghub.model.User;
import swp.group2.learninghub.model.sdi.ClientSdi;
import swp.group2.learninghub.model.sdi.ContactSdi;
import swp.group2.learninghub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    @Autowired
    HttpSession session;
    @Autowired
    private UserService userService;
    org.slf4j.Logger logger = LoggerFactory.getLogger(UserController.class);

    private static final String ADMIN_ROLE = "ADMIN";
    private static final String SUCCESSMSG = "Success";
    private static final String FAILMSG = "Fail";
    private static final String UNAUTHORIZED = "Unauthorized";

    @Autowired
    public UserController(HttpSession session, UserService userService) {
        this.session = session;
        this.userService = userService;
    }

    @DeleteMapping("/")
    public ResponseEntity<ResponseObject> deactivateUser(@RequestParam("email") String target, @RequestParam("password") String password) {
        try {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            User sessionUser = (User) session.getAttribute("user"); /* Session user */
            if (sessionUser == null) {
                throw new IllegalArgumentException("session user information not found");
            }
            if(!passwordEncoder.matches(password, sessionUser.getPassword().trim())){
                throw new IllegalArgumentException("password not match");
            }
            if (sessionUser.getEmail().compareToIgnoreCase(target) != 0
                    && sessionUser.getRoleId().compareToIgnoreCase(ADMIN_ROLE) != 0) {
                throw new IllegalArgumentException(UNAUTHORIZED);
            }
            userService.deactivate(target);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(SUCCESSMSG, "deactive account successfully", target));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject(FAILMSG, "Failed deactive account: "
                            + target, e.getMessage()));
        }
    }

    @Transactional
    @PutMapping("/reactive")
    public ResponseEntity<ResponseObject> reactiveUser(@RequestParam("email") String email, @RequestParam("password") String password) {
        try {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            User target = userService.findByEmail(email).get(0); /* Session user */
            if (target == null) {
                throw new IllegalArgumentException("user information not found");
            }
            if(!passwordEncoder.matches(password, target.getPassword().trim())){
                throw new IllegalArgumentException("password not match");
            }
            if (target.getRoleId().compareToIgnoreCase(ADMIN_ROLE) == 0) {
                throw new IllegalArgumentException(UNAUTHORIZED);
            }
            target.setActive(true);
            userService.update(target);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(SUCCESSMSG, "reactive account successfully", target));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject(FAILMSG, "Failed reactive account: "
                            + email, e.getMessage()));
        }
    }

    @GetMapping("/current")
    public User showCurrentUser() {
        return (User) session.getAttribute("user");
    }

    @GetMapping("/profile")
    public ResponseEntity<ResponseObject> getUserProfile(@RequestParam("email") String email) {
        try {

            User sessionUser = (User) session.getAttribute("user"); /* Session user */
            if (sessionUser.getEmail().compareToIgnoreCase(email) != 0
                    && sessionUser.getRoleId().compareToIgnoreCase(ADMIN_ROLE) != 0) {
                throw new IllegalArgumentException(UNAUTHORIZED);
            }
            List<User> users = userService.findByEmail(email);
            if (!users.isEmpty()) {
                User user = users.get(0);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(SUCCESSMSG, "Get user profile success", user));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject(FAILMSG, "User not found", null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject(FAILMSG, "Failed to retrieve user profile: " + e.getMessage(), null));
        }
    }
    @Transactional
    @PutMapping("/profile")
    public ResponseEntity<ResponseObject> updateUserProfile(@RequestBody User updatedUser) {
        try {
            User sessionUser = (User) session.getAttribute("user"); /* Session user */
            /* check if updated user is match with session user or session user is admin */
            if (sessionUser.getEmail().compareToIgnoreCase(updatedUser.getEmail()) != 0
                    && sessionUser.getRoleId().compareToIgnoreCase(ADMIN_ROLE) != 0) {
                throw new IllegalArgumentException(UNAUTHORIZED);
            }
            userService.update(updatedUser);
            User newValue = userService.findByEmail(sessionUser.getEmail()).get(0);
            session.setAttribute("user",newValue);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(SUCCESSMSG, "update user profile successfully", updatedUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject(FAILMSG, "can not update user profile", e.getMessage()));
        }
    }

    /* only admin can use this api to show User list */
    @GetMapping
    public ResponseEntity<ResponseObject> showAll() {
        try {
            User sessionUser = (User) session.getAttribute("user"); /* Session user */
            if (sessionUser.getRoleId().equals(ADMIN_ROLE)) {
                throw new IllegalArgumentException(UNAUTHORIZED);
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(SUCCESSMSG, "retrieve users information ", userService.showUsers()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject(FAILMSG, "can not retrieves user information", e.getMessage()));
        }
    }

    /* Create new user account based on json sent by client site */
    @PostMapping("/login")
    ResponseEntity<ResponseObject> userLogin(@RequestBody LoginRequest loginRequest) {
        try {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            List<User> u1 = userService.findByEmail(loginRequest.getEmail().trim());
            if (u1.isEmpty()) {
                throw new IllegalArgumentException("can not find email");
            }
            if (!u1.get(0).isActive()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseObject(FAILMSG, "Login Successful!", "can not login because the account has been deactivated"));
            }
            if (passwordEncoder.matches(loginRequest.getPassword(), u1.get(0).getPassword().trim())) {
                session.setAttribute("user", u1.get(0));
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(SUCCESSMSG, "Login Successful!", u1));
            }
            throw new IllegalArgumentException("login failed due to password or email is invalid");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(FAILMSG, "Email or PassWord invalid!",
                            e.getMessage()));
        }
    }

    /* Invalidate current session */
    @PostMapping("/logout")
    ResponseEntity<ResponseObject> logout() {
        session.invalidate();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject(SUCCESSMSG, "Logout success!", null));
    }

    @PostMapping("/register")
    ResponseEntity<ResponseObject> userRegister(@RequestBody User newUser) {
        try {
            userService.register(newUser);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(SUCCESSMSG, "account registed successfull", newUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    new ResponseObject(FAILMSG, "account fail to add, reason: " + e.getMessage(), null));
        }
    }

    @PutMapping("/password")
    ResponseEntity<ResponseObject> changePass(@RequestBody ChangePass changePass) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String passRegex = "^(?=.*[\\d])(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{8,}$";
        User u = (User) session.getAttribute("user");
        if (passwordEncoder.matches(changePass.getOldpass(), u.getPassword())) {
            if (changePass.getNewpass().trim().equals("") || changePass.getVerpass().trim().equals("")) {
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                        .body(new ResponseObject(FAILMSG, "verification password and new password must not be blank", null));
            } else if (changePass.getNewpass().equals(changePass.getVerpass())) {
                if(!changePass.getNewpass().matches(passRegex)){
                    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                            .body(new ResponseObject(FAILMSG, "New password is not in a right format. new password must contain, " +
                                    "decimal, letter(both lower and upper case) and has 8 or more character length. No space character are allow", null));
                }
                User userUpdate = new User(u.getEmail(), u.getRealName(), u.getPhoneNum(), changePass.getNewpass(),
                        u.getRoleId(),
                        u.isActive(), u.getSignupDate());
                userUpdate.setPassword(changePass.getNewpass());
                userService.save(userUpdate);
                session.setAttribute("user", userUpdate);
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ResponseObject(SUCCESSMSG, "change password successful!", userUpdate));
            } else {
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                        .body(new ResponseObject(FAILMSG, "verification password and new password are not the same", null));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body(new ResponseObject(FAILMSG, "Password not correct!", null));
        }
    }

    @PutMapping("/reset/password")
    ResponseEntity<ResponseObject> ResetPass(@RequestBody LoginRequest loginRequest) {
        List<User> user=userService.findByEmail(loginRequest.getEmail().trim());
        User u=user.get(0);
        User userUpdate = new User(u.getEmail(), u.getRealName(), u.getPhoneNum(),loginRequest.getPassword(),
                u.getRoleId(),
                u.isActive(), u.getSignupDate());
        userUpdate.setPassword(loginRequest.getPassword());
        userService.save(userUpdate);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject(SUCCESSMSG, "change password successful!", userUpdate));

    }

    @PostMapping(value = "/password")
    public ResponseEntity<ResponseObject> forgetPassWord(
            @RequestParam(name = "email", required = false, defaultValue = "") String email) {
        List<User> u = userService.findByEmail(email);
        if (!u.isEmpty()) {
            ClientSdi sdi = new ClientSdi(u.get(0).getRealName(), email, email);
            String otp=userService.create(sdi);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(SUCCESSMSG, "Send email success!", otp));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject(FAILMSG, "Email not found!", ""));
        }
    }
    @PostMapping(value = "/contact")
    public ResponseEntity<ResponseObject> contact(
            @RequestBody ContactSdi contactSdi){
        try {
            Boolean success = userService.contact(contactSdi);

            if (success) {
                return ResponseEntity.ok(new ResponseObject("Email sent successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseObject("Failed to send email"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseObject("Failed to send email"));
        }
    }
}
