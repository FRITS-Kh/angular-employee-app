import { Injectable } from '@angular/core';

import { Employee, Recruiter, User, UserCreateRequest } from '@app/store/user';
import { Dictionaries } from '@app/store/dictionaries';
import { ProfileForm } from '../../form.component';
import { EmployeeForm } from '../../components/professional/roles/employee/employee.component';
import { RecruiterForm } from '../../components/professional/roles/recruiter/recruiter.component';

@Injectable()
export class MapperService {
  userToForm(user: User): ProfileForm {
    return {
      personal: {
        name: user?.name ?? '',
        photoUrl: user?.photoUrl ?? '',
        country: user?.country ?? '',
      },
      professional: {
        about: user?.about ?? '',
        roleId: user?.roleId ?? '',
        role: user ? this.getFormRole(user) : null,
      },
    };
  }

  private getFormRole(user: User): EmployeeForm | RecruiterForm | null {
    if (user.roleId === 'employee') {
      const role = user.role as Employee;
      const formRole: EmployeeForm = {
        expectedSalary: role.expectedSalary,
        specialization: role.specialization?.id ?? '',
        qualification: role.qualification?.id ?? '',
        skills: role.skills.map((skill) => skill.id),
        experiences: role.experiences,
      };

      return formRole;
    }

    if (user.roleId === 'recruiter') {
      const role = user.role as Recruiter;
      const formRole: RecruiterForm = {
        companyName: role.companyName,
        employeesCount: role.employeesCount,
      };

      return formRole;
    }

    return null;
  }

  formToUserCreate(
    form: ProfileForm,
    dictionaries: Dictionaries
  ): UserCreateRequest {
    return {
      name: form.personal?.name ?? '',
      photoUrl: form.personal?.photoUrl ?? '',
      roleId: form.professional?.roleId ?? '',
      country: form.personal?.country ?? '',
      about: form.professional?.about ?? '',
      role: this.getRole(form, dictionaries),
    };
  }

  formToUserUpdate(
    form: ProfileForm,
    user: User,
    dictionaries: Dictionaries
  ): User {
    return {
      uid: user.uid,
      email: user.email,
      created: user.created,
      name: form.personal?.name ?? '',
      photoUrl: form.personal?.photoUrl ?? '',
      roleId: form.professional?.roleId ?? '',
      country: form.personal?.country ?? '',
      about: form.professional?.about ?? '',
      role: this.getRole(form, dictionaries),
    };
  }

  private getRole(
    form: ProfileForm,
    dictionaries: Dictionaries
  ): Employee | Recruiter | null {
    if (form.professional?.roleId === 'employee') {
      const formRole = form.professional.role as EmployeeForm;
      const role: Employee = {
        expectedSalary: formRole.expectedSalary,
        specialization:
          dictionaries.specializations.items.find(
            (item) => item.id === formRole.specialization
          ) ?? null,
        qualification:
          dictionaries.qualifications.items.find(
            (item) => item.id === formRole.qualification
          ) ?? null,
        skills: formRole.skills.reduce<Employee['skills']>(
          (skills, formSkill) => {
            const skill = dictionaries.skills.items.find(
              (item) => item.id === formSkill
            );

            return skill ? [...skills, skill] : skills;
          },
          []
        ),
        experiences: formRole.experiences,
      };

      return role;
    }

    if (form.professional?.roleId === 'recruiter') {
      const formRole = form.professional.role as RecruiterForm;
      const role: Recruiter = {
        companyName: formRole.companyName,
        employeesCount: formRole.employeesCount,
      };

      return role;
    }

    return null;
  }
}
