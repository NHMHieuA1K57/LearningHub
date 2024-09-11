package swp.group2.learninghub.service;

import jakarta.mail.MessagingException;
import swp.group2.learninghub.model.DataMailDTO;

public interface MailService {
    void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException;
}
