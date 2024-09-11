package swp.group2.learninghub;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import swp.group2.learninghub.model.Feature;
import swp.group2.learninghub.service.FeatureService;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class LearningHubApplicationTests {

    @Autowired
    FeatureService featureService;
    @Test
    void contextLoads() {
    }
    @Test
    void testFeatureDAO(){
    //given
        Feature test = featureService.findFeatureById(1);

        //then
        assertNotNull(test);

    }

}
