package swp.group2.learninghub.utils;


import java.util.Random;

public class DataUtils {
    private static Random r = new Random();

    public static String generateTempPwd(int length) {
        String numbers;
        numbers = "012345678";
        char[] otp = new char[length];

        for (int i = 0; i < length; i++) {
            otp[i] = numbers.charAt(r.nextInt(numbers.length()));
        }
        StringBuilder bld = new StringBuilder();
        for (int i = 0; i < otp.length; i++) {
            bld.append(otp[i]);
        }
        return bld.toString();
    }
}
