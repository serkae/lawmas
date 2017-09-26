package com.save.tests;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.ims.beans.State;
import com.ims.repositories.StateRepository;

@SpringBootApplication
public class StatesTest implements CommandLineRunner {
	
	@Autowired
	DataSource datasource;
	
	@Autowired
	StateRepository ss;

	public static void main(String[] args) {
		SpringApplication.run(StatesTest.class, args);
		
	}

	@Transactional
	@Override
	public void run(String... arg0) throws Exception {
		
		State state1=ss.saveAndFlush(new State(1, "Alabama"));
		State state2	= ss.saveAndFlush(new State(	2	, "Alaska"));
		State state3	= ss.saveAndFlush(new State(	3	, "Arizona"));
		State state4	= ss.saveAndFlush(new State(	4	, "Arkansas"));
		State state5	= ss.saveAndFlush(new State(	5	, "California"));
		State state6	= ss.saveAndFlush(new State(	6	, "Colorado"));
		State state7	= ss.saveAndFlush(new State(	7	, "Connecticut"));
		State state8	= ss.saveAndFlush(new State(	8	, "Delaware"));
		State state9	= ss.saveAndFlush(new State(	9	, "Florida"));
		State state10	= ss.saveAndFlush(new State(	10	, "Georgia"));
		State state11	= ss.saveAndFlush(new State(	11	, "Hawaii"));
		State state12	= ss.saveAndFlush(new State(	12	, "Idaho"));
		State state13	= ss.saveAndFlush(new State(	13	, "Illinois"));
		State state14	= ss.saveAndFlush(new State(	14	, "Indiana"));
		State state15	= ss.saveAndFlush(new State(	15	, "Iowa"));
		State state16	= ss.saveAndFlush(new State(	16	, "Kansas"));
		State state17	= ss.saveAndFlush(new State(	17	, "Kentucky"));
		State state18	= ss.saveAndFlush(new State(	18	, "Louisiana"));
		State state19	= ss.saveAndFlush(new State(	19	, "Maine"));
		State state20	= ss.saveAndFlush(new State(	20	, "Maryland"));
		State state21	= ss.saveAndFlush(new State(	21	, "Massachusetts"));
		State state22	= ss.saveAndFlush(new State(	22	, "Michigan"));
		State state23	= ss.saveAndFlush(new State(	23	, "Minnesota"));
		State state24	= ss.saveAndFlush(new State(	24	, "Mississippi"));
		State state25	= ss.saveAndFlush(new State(	25	, "Missouri"));
		State state26	= ss.saveAndFlush(new State(	26	, "Montana"));
		State state27	= ss.saveAndFlush(new State(	27	, "Nebraska"));
		State state28	= ss.saveAndFlush(new State(	28	, "Nevada"));
		State state29	= ss.saveAndFlush(new State(	29	, "New Hampshire"));
		State state30	= ss.saveAndFlush(new State(	30	, "New Jersey"));
		State state31	= ss.saveAndFlush(new State(	31	, "New Mexico"));
		State state32	= ss.saveAndFlush(new State(	32	, "New York"));
		State state33	= ss.saveAndFlush(new State(	33	, "North Carolina"));
		State state34	= ss.saveAndFlush(new State(	34	, "North Dakota"));
		State state35	= ss.saveAndFlush(new State(	35	, "Ohio"));
		State state36	= ss.saveAndFlush(new State(	36	, "Oklahoma"));
		State state37	= ss.saveAndFlush(new State(	37	, "Oregon"));
		State state38	= ss.saveAndFlush(new State(	38	, "Pennsylvania"));
		State state39	= ss.saveAndFlush(new State(	39	, "Rhode Island"));
		State state40	= ss.saveAndFlush(new State(	40	, "South Carolina"));
		State state41	= ss.saveAndFlush(new State(	41	, "South Dakota"));
		State state42	= ss.saveAndFlush(new State(	42	, "Tennessee"));
		State state43	= ss.saveAndFlush(new State(	43	, "Texas"));
		State state44	= ss.saveAndFlush(new State(	44	, "Utah"));
		State state45	= ss.saveAndFlush(new State(	45	, "Vermont"));
		State state46	= ss.saveAndFlush(new State(	46	, "Virginia"));
		State state47	= ss.saveAndFlush(new State(	47	, "Washington"));
		State state48	= ss.saveAndFlush(new State(	48	, "West Virginia"));
		State state49	= ss.saveAndFlush(new State(	49	, "Wisconsin"));
		State state50	= ss.saveAndFlush(new State(	50	, "Wyoming"));



	}

}
