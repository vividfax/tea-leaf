class Leaf {

    constructor(x, y) {

        this.radius = random(10, 20);
        this.colour = lerpColour("#5E510E", "#504A19", random());
        this.rotation = random(360);
        this.rotationDirection = random(-1, 1);
        this.thickness = random(this.radius/6, this.radius/2);

        if (x == 0 && y == 0) {
            this.x = random(width/2 - 50, width/2 + 50);
            this.y = random(height/2 - 50, height/2 + 50);

            let distance = dist(this.x, this.y, width/2, height/2);
            while (distance > 20) {
                this.x = random(width/2 - 50, width/2 + 50);
                this.y = random(height/2 - 50, height/2 + 50);
                distance = dist(this.x, this.y, width/2, height/2);
            }
        } else {
            this.x = x;
            this.y = y;
        }

        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.velocity.x *= 0.3;
        this.velocity.y *= 0.3;

        this.changedDirectionLastFrame = false;
        this.changedDirectionCount = 0;

        this.stuck = false;
    }

    update() {

        if (this.stuck || !drinking) {
            return;
        }

        let distance = dist(this.x, this.y, width/2, height/2);
        let bounce = distance > waterAmount/2 - this.radius*3;
        let stick = distance > waterAmount/2 - this.radius/2;

        if (stick) {
            this.stuck = true;
            return;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        for (let i = 0; i < leaves.length; i++) {
            if (leaves[i] == this) {
                continue;
            }

            if (this.collide(leaves[i])) {
                bounce = true;
            }
        }

        if (bounce && !this.changedDirectionLastFrame) {

            this.velocity = createVector(random(-1, 1), random(-1, 1));
            this.velocity.x *= 0.3;
            this.velocity.y *= 0.3;

            this.changedDirectionLastFrame = true;
        } else {
            this.changedDirectionCount += 1/5;
        }

        if (this.changedDirectionCount > this.radius) {
            this.changedDirectionLastFrame = false;
            this.changedDirectionCount = 0;
        }

        this.rotation += this.rotationDirection;
    }

    display() {

        push();
        translate(this.x, this.y);
        rotate(this.rotation);

        fill(this.colour);
        rect(0, 0, this.radius + 3, this.thickness + 3);

        pop();
    }

    collide(leaf) {

        let distance = dist(leaf.x, leaf.y, this.x, this.y);

        if (distance < (this.radius + leaf.radius)/2) {

            if (leaf.stuck) {
                this.stuck = true;
            }
            return true;
        }

        return false;
    }
}