package swp.group2.learninghub.utils;

public class Const {
    public static final class SendMailSubject {
        public static final String CLIENT_REGISTER = "Confirm new creation of user information";
        public static final String CONTRACT_REGISTER="A User send a contact to you";

        // Private constructor to prevent instantiation
        private SendMailSubject() {}
    }

    public static final class TemplateFileName {
        public static final String CLIENT_REGISTER = "client";
        public static final String CONTACT_REGISTER = "contact";
        // Private constructor to prevent instantiation
        private TemplateFileName() {}
    }
}
