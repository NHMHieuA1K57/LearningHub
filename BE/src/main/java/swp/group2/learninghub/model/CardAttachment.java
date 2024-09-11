package swp.group2.learninghub.model;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;



import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class CardAttachment {
    @Id
    private int id;
    private int cardId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updateDate;
    private  String filename;
    private String url;
}
