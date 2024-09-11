package swp.group2.learninghub.service;

import java.util.List;

import swp.group2.learninghub.model.User;
import swp.group2.learninghub.model.sdi.ClientSdi;
import swp.group2.learninghub.model.sdi.ContactSdi;

public interface UserService {
    List<User> showUsers();

    User register(User newUser);

    void save(User newUser);

    void update(User updatedUser);

    List<User> findByEmail(String name);

    public String create(ClientSdi sdi);

    public void deactivate(String target);

    public Boolean contact(ContactSdi sdi);
}
