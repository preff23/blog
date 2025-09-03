import { useState } from 'react';
import '../styles/tabs.css';

const teamMembers = [
  {
    id: 1,
    name: 'Алексей Петров',
    role: 'Frontend Developer',
    description: 'Опытный разработчик с 5-летним стажем работы с React, Vue.js и современными веб-технологиями. Специализируется на создании пользовательских интерфейсов и оптимизации производительности.'
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    role: 'UI/UX Designer',
    description: 'Креативный дизайнер с глубоким пониманием пользовательского опыта. Создает интуитивные и красивые интерфейсы, которые помогают пользователям достигать своих целей.'
  },
  {
    id: 3,
    name: 'Иван Козлов',
    role: 'Backend Developer',
    description: 'Серверный разработчик с опытом работы с Node.js, Python и базами данных. Отвечает за архитектуру приложения и интеграцию с внешними API.'
  },
  {
    id: 4,
    name: 'Ольга Морозова',
    role: 'Project Manager',
    description: 'Опытный менеджер проектов с навыками координации команды разработчиков. Обеспечивает своевременную доставку качественных продуктов.'
  }
];

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const currentMember = teamMembers[activeTab];

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {teamMembers.map((member, index) => (
          <button
            key={member.id}
            className={`tab-button ${index === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {member.name}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <div className="team-member">
          <div className="member-photo">
            {currentMember.name.charAt(0)}
          </div>
          <div className="member-info">
            <h3>{currentMember.name}</h3>
            <p className="member-role">{currentMember.role}</p>
            <p className="member-description">{currentMember.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
