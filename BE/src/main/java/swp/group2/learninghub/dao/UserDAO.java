package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import swp.group2.learninghub.model.User;

import java.util.List;

@Repository
public interface UserDAO extends JpaRepository<User,String> {
    List<User> findByEmail(String name);

    @Modifying
    @Query("update User u set u.realName =:name, u.phoneNum=:phone where u.email=:email")
    void updateUser( @Param(value = "email")String email, @Param(value = "name")String name, @Param(value = "phone") String phone);

}
