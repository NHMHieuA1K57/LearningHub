package swp.group2.learninghub.service;

import jakarta.mail.MessagingException;
import org.slf4j.LoggerFactory;
import swp.group2.learninghub.dao.UserDAO;
import swp.group2.learninghub.model.DataMailDTO;
import swp.group2.learninghub.model.User;
import swp.group2.learninghub.model.sdi.ClientSdi;
import swp.group2.learninghub.model.sdi.ContactSdi;
import swp.group2.learninghub.utils.Const;
import swp.group2.learninghub.utils.DataUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private final UserDAO userDAO;
    @Autowired
    private MailService mailService;
    org.slf4j.Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public void update(User updatedUser) {
        userDAO.updateUser(updatedUser.getEmail(),updatedUser.getRealName(),updatedUser.getPhoneNum());
    }

    @Override
    public User register(User newUser) {
        LocalDateTime now = LocalDateTime.now();
        String emailRegex = "^(.+)@(\\S+)$";
        String phoneRegex = "^\\d{10}$";
        logger.info(newUser.getPassword());
        newUser.setActive(true);
        newUser.setRoleId("USER");
        newUser.setSignupDate(Date.from(now.toInstant(ZoneOffset.UTC)));
        // check if fields are valid
        if (userDAO.existsById(newUser.getEmail())) {
            throw new IllegalArgumentException("email is already in use");
        }
        if (!newUser.getEmail().matches(emailRegex) || !newUser.getPhoneNum().matches(phoneRegex)) {
            throw new IllegalArgumentException("input field are not in right format");
        }
        return userDAO.save(newUser);
    }

    @Override
    public List<User> showUsers() {
        return userDAO.findAll();
    }

    @Override
    public List<User> findByEmail(String name) {
        return userDAO.findByEmail(name);
    }

    @Override
    public String create(ClientSdi sdi) {
        String otp="";
        try {
            DataMailDTO dataMail = new DataMailDTO();
            dataMail.setTo(sdi.getEmail());
            dataMail.setSubject(Const.SendMailSubject.CLIENT_REGISTER);
            otp = DataUtils.generateTempPwd(6);
            Map<String, Object> props = new HashMap<>();
            props.put("name", sdi.getName());
            props.put("username", sdi.getUsername());
            props.put("otp", otp);
            dataMail.setProps(props);
            mailService.sendHtmlMail(dataMail, Const.TemplateFileName.CLIENT_REGISTER);
            return  otp;
        } catch (MessagingException exp) {
            exp.printStackTrace();
        }
        return otp;
    }

    @Override
    public void save(User newUser) {
        userDAO.save(newUser);
    }

    @Override
    public void deactivate(String target) {
        Optional<User> optionalUser = userDAO.findById(target);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setActive(false);
             try{
            userDAO.save(user);
             }catch(Exception e){
             throw new IllegalArgumentException("unable to change status: "+e.getMessage());
             }
        } else {
            throw new IllegalArgumentException("email can not be found");
        }
    }

    @Override
    public Boolean contact(ContactSdi sdi) {
        try {
            DataMailDTO dataMail = new DataMailDTO();
            dataMail.setTo("truongpdhe170417@fpt.edu.vn");
            dataMail.setSubject(Const.SendMailSubject.CONTRACT_REGISTER);
            Map<String, Object> props = new HashMap<>();
            props.put("name", sdi.getName());
            props.put("phone", sdi.getPhone());
            props.put("email", sdi.getEmail());
            props.put("messenger", sdi.getMess());
            dataMail.setProps(props);
            mailService.sendHtmlMail(dataMail, Const.TemplateFileName.CONTACT_REGISTER);

            return true;
        } catch (MessagingException exp) {
            exp.printStackTrace();
        }
        return false;
    }

}
