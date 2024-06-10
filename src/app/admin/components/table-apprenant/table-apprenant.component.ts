import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-apprenant',
  templateUrl: './table-apprenant.component.html',
  styleUrls: ['./table-apprenant.component.css']
})
export class TableApprenantComponent implements OnInit {
  apprenants: User[] = [];
  userForm!: FormGroup;
  showForm: boolean = false;
  selectedUser: User | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      isPremium: ['']
    });
    this.loadApprenants();
  }

  loadApprenants(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log('Loaded users:', data);
        this.apprenants = data.filter(user => user.type === 'Apprenant');
      },
      error: (error) => {
        console.error('Error loading users', error);
      }
    });
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.userForm.patchValue({
      fullName: user.fullName,
      email: user.email,
      type: user.type,
      isPremium: user.isPremium
    });
    this.showForm = true;
  }

  saveUser(): void {
    if (this.userForm.valid && this.selectedUser && this.selectedUser._id) {
      const updatedUser = { ...this.userForm.value, _id: this.selectedUser._id };
      this.userService.updateUser(this.selectedUser._id, updatedUser).subscribe({
        next: () => {
          this.loadApprenants();
          this.showForm = false;
          this.selectedUser = null;
        },
        error: (error) => console.error('Failed to update user', error)
      });
    } else {
      console.error('Form is invalid or no user selected');
    }
  }

  deleteUser(userId: string): void {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.apprenants = this.apprenants.filter(user => user._id !== userId);
        console.log('User deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting user', error);
      }
    });
  }
}