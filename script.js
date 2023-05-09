const canvas = document.querySelector('canvas');
// in canvas the top moest corner is x = 0 and y = 0 and it changes as we move far away

/* these set the element sizes to full width and height of screen */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/* api to use the canvas */
const c = canvas.getContext('2d');



/* to define player properties */
class Player
{
	constructor(x , y , radius , color)
	{
		this.x = x 
		this.y = y
		this.radius = radius
		this.color = color 
	}
	draw() 
	{
	c.beginPath()
	c.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false); // to draw the circle 
	// thi.x - x cordinate | this.y - y cordinate | this.radius for radius | start angle - 0 | arc - math.pi * 2 (360) | false - to draw c.c or not
	c.fillStyle = this.color; // to give  the style of fill
	c.fill(); // to fill the circle
}
}

// creating a class for projectile to define its properties 
class Projectile 
{
	constructor( x , y , radius , color , velocity)
	{
		this.x = x
		this.y = y 
		this.radius = radius 
		this.color = color
		this.velocity = velocity
	}
	draw() 
	{
	c.beginPath()
	c.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false); // to draw the circle 
	// thi.x - x cordinate | this.y - y cordinate | this.radius for radius | start angle - 0 | arc - math.pi * 2 (360) | false - to draw c.c or not 
	c.fillStyle = this.color; // to give  the style of fill
	c.fill(); // to fill the circle
	}
	update()
	{
		this.draw();// this would allow us to call the above fucntion draw along when update is called
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}

}

// creating a class for enemies to define its properties 
class Enemy
{
	constructor( x , y , radius , color , velocity)
	{
		this.x = x
		this.y = y 
		this.radius = radius 
		this.color = color
		this.velocity = velocity
	}
	draw() 
	{
	c.beginPath()
	c.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false); // to draw the circle 
	// thi.x - x cordinate | this.y - y cordinate | this.radius for radius | start angle - 0 | arc - math.pi * 2 (360) | false - to draw c.c wise
	c.fillStyle = this.color; // to give  the style of fill
	c.fill(); // to fill the circle
	}
	update()
	{
		this.draw();// this would allow us to call the above function draw along when update is called
		this.x = this.x + this.velocity.x; // it means the x term defined for velocity - velocity {x: , y:}
		this.y = this.y + this.velocity.y; // it means the y term defined for velocity - velocity {x: , y:}
	}

}
const friction = 0.99 ; 
class Particle
{
	constructor( x , y , radius , color , velocity)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
		this.alpha = 1;
	}
	draw() 
	{
	c.save();
	c.globalAlpha = this.alpha;
	c.beginPath()
	c.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false); // to draw the circle 
	// thi.x - x cordinate | this.y - y cordinate | this.radius for radius | start angle - 0 | arc - math.pi * 2 (360) | false - to draw c.c wise
	c.fillStyle = this.color; // to give  the style of fill
	c.fill(); // to fill the circle
	c.restore();
	}
	update()
	{
		this.draw();// this would allow us to call the above function draw along when update is called
		this.velocity.x *= friction;
		this.velocity.y *= friction;
		this.x = this.x + this.velocity.x; // it means the x term defined for velocity - velocity {x: , y:}
		this.y = this.y + this.velocity.y; // it means the y term defined for velocity - velocity {x: , y:}
		this.alpha -= 0.01
	}

}


// to dynamically determine the center of webpage 
const x = canvas.width / 2
const y = canvas.height / 2

// creating an instance of player
const player = new Player(x , y , 10 , 'white' )


//defining the projectile instance 
//const projectile = new Projectile(x,y,5,'red',{ x:1,y:1});
	//remember to use the const name not the class name to call the draw method
//const projectile1 = new Projectile(x,y,5,'green',{ x:-1,y:-1});


//const projectiles=[projectile,projectile1]
const projectiles = []
const enemies = []
const particles = []

function spawnEnemies()
{
	setInterval(() =>{
		// defining the value of the enemy 
		let x ; // these are defined outside so that it can be used even outside the if condition
		let y ;
		//const radius = 30; - IT WOULD CREATE ONLY ONE SIZE OF ENEMIES
		// const radius = Math.random() * 30 ; // this would create of diff sizes but there can be very small which would be hard to hit 
		const radius = Math.random() * (40 - 6) + 6 ; // this means we would get enemies of sizes from 30 to 4 px 
		//const x = Math.random() * canvas.width;
		//const y = Math.random() * canvas.height;
		//using the above values would create a chance for enemy too close to the player but the values would be at random location
		//-------------------------------------------------------------------------------------------------------------------------
		//const x = Math.random() < 0.5 ? 0- radius : canvas.width + radius ; //this would make the enemies come from the screen edge 
		//in the above case if the value is < 0.5 that is on left side it would spawn from left screen end and > 0.5 from the right edge
		//const y = Math.random() < 0.5 ? 0- radius : canvas.height + radius ; //this would make the enemies come from the screen edge 
		// the above case has a problem that the enemies spawn only from corners since the x and y have 4 combinations possible 
		//-------------------------------------------------------------------------------------------------------------------------
		if(Math.random()< 0.5)  // that is on the left side of screen 
		{
		    x = Math.random() < 0.5 ? 0- radius : canvas.width + radius ; //this would make the enemies come from the screen edge 
			y = Math.random() * canvas.height;
		}
		else 
		{ 
		x = Math.random() * canvas.width;
		y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius ; //this would make the enemies come from the screen edge 
	}
		
		const color = `hsl(${Math.random() * 360} , 50% , 50%)`;
		// since it comes from diff positions to center player it is subttracted from center to poistion to find the x and y cordinates
		//math.atan2 returns the angle , and it takes (y,x)
		const angle = Math.atan2(canvas.height / 2 - y, canvas.width/2 - x  )
		const velocity = {  x: Math.cos(angle), y: Math.sin(angle) }
		enemies.push(new Enemy(x,y,radius, color,velocity))


	} ,1000) //1000 - 1s it is at what interval it should call enemies 
	//this means this functions defined inside set interval will execute after every 1000ms - 1s
}



let animationId; // a variable created to assign the animation request to it 
function animate()
{
	//this makes it will call the same fucntion again and again 
	animationId = requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0 , 0 , 0 , 0.1)';
	c.fillRect(0,0,canvas.width ,canvas.height);//this is to keep the canvas clear instead of geeting lines we get balls
	//but the above statement will even clear the palyer so we need to call the player.draw() everytime so it is visible
	player.draw();
	particles.forEach((Particle , index) => {
		if (Particle.alpha <= 0) {
			particles.splice(index , 1);}
			else
			{
				Particle.update(); 
			}});
	

	projectiles.forEach((projectile , index) => {
		projectile.update();
		// the below function would remove the projectiles which are out of the frame 
		if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y -  projectile.radius > canvas.height) 
		{
			setTimeout(() => {
				projectiles.splice(index , 1);
				
			}, 0);
		}

	
	})
//the above does that for every element in array it call the update acc to the element coordinates
enemies.forEach((enemy , index) => {enemy.update() 
	const dist = Math.hypot(player.x - enemy.x , player.y - enemy.y);
	if(dist - player.radius - enemy.radius <  1 )
	{
		cancelAnimationFrame(animationId); // to stop the animation id when the palyer and enemy collide.
	}

	// note we need to write the below fucnction inside the main enemies so that the enemy attribute can be used inside the below fucntion.
	projectiles.forEach((projectile , projectileIndex ) => {
		const dist = Math.hypot(projectile.x - enemy.x , projectile.y - enemy.y); 
		//the above statement is used to find the dist between enemy and projectile 

	if(dist - projectile.radius - enemy.radius <  1 ) // dist - distance between center , so for collision we subtract the radii as well
	{ 
		for(i = 0 ; i < enemy.radius * 2 ; i ++)
		{
			particles.push(new Particle(projectile.x , projectile.y , Math.random() * 2 , enemy.color , {x : (Math.random()- 0.5) * (Math.random() * 6), y : (Math.random()- 0.5) * (Math.random() * 6)}))
		}
		if (enemy.radius - 10 > 7 ) 
		{
			gsap.to(enemy,{radius :enemy.radius - 10});
			//enemy.radius -= 10;
			setTimeout(()=> { 
				projectile.splice(projectileIndex , 1); // to remove the projectile
				} , 0)		
			}
		else
		{
		// on removing the enemy from the array , they all flash , so using this would not do that 
		setTimeout(()=> { 
		enemies.splice(index , 1); // it is to remove the enemy after collision
		projectile.splice(projectileIndex , 1); // to remove the projectile
		} , 0)
	}
	}
	 })
})



}


//EXTRA INFO 
	//now event since it is click here , returns the details of the pointer like the cordinates and all 
	//clientX - returns X cordinat
	//clientY - returns Y cordinate 

//when there is a click these set of instructions are executed
window.addEventListener('click',(event) => 
{
	const angle = Math.atan2(event.clientY-y,event.clientX-x)
	const velocity = {x:Math.cos(angle) * 6 ,y:Math.sin(angle) * 6 }
	// to create dynamic projectiles instead of static like in that of projectile , projectile1
	projectiles.push(new Projectile(x , y, 5,'white',velocity))
	
	console.log(angle); 
	
})

animate(); // to call the function
spawnEnemies();  // to call the function 



























